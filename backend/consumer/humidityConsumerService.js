import { kafka } from "../kakfa/client.js";

const consumer = kafka.consumer({groupId : 'weather-services'})


async function getConsumerConnection(){
    try {
       console.log("Consumer connection");
       await consumer.connect(); 
       console.log("Consumer connencted");
       await consumer.subscribe({topics: ['weather-topic'],fromBeginning: true})

    } catch (error) {
        console.log("Error in Consumer Connection", error)
    }
}

async function getMessages(){
    try {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    console.log({
                        topic: topic.toString(),
                        partition: partition.toString(),
                        key: message.key ? message.key.toString() : "null",
                        value: message.value ? message.value.toString() : "null",
                    });
                } catch (error) {
                    console.error(" Error processing message:", error);
                }
            },
        });
    } catch (error) {
        console.error(" Error in consumer.run():", error);
    }
}

(async()=>{
    await getConsumerConnection();
    await getMessages();
})()