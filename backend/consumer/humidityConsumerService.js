import { connectToDB } from "../database/index.js";
import Sensor from "../database/models/SensorModel.js";
import { kafka } from "../kakfa/client.js";
import dotenv from "dotenv";

dotenv.config();
const consumer = kafka.consumer({ groupId: 'weather-services' })

let BUFFERSIZE = 100;
let FLUSH_INTERVAL = 5000;
let messageBuffer = [];



async function flushBuffer() {
    if (messageBuffer.length == 0) {
        return;
    }
    try {
        console.log(messageBuffer);
        await connectToDB();

        await Sensor.insertMany(messageBuffer);
        console.log(`Inserted ${messageBuffer.length} documents`);
        messageBuffer = [] // Clear the buffer after insertion
    } catch (error) {
        console.error("Error inserting documents:", error);
    }
}

setInterval(flushBuffer, FLUSH_INTERVAL)


async function getConsumerConnection() {
    try {
        console.log("Consumer connection");
        await consumer.connect();
        console.log("Consumer connencted");
        await consumer.subscribe({ topics: ['weather-topic'], fromBeginning: true })

    } catch (error) {
        console.log("Error in Consumer Connection", error)
    }
}

async function getMessages() {
    try {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    let parsedValue = null;

                    if (message.value) {
                        try {
                            parsedValue = JSON.parse(message.value.toString()); // Parse JSON
                        } catch (error) {
                            console.error("❌ Error parsing message.value:", error);
                            parsedValue = { value: "Invalid JSON", parameter: "Unknown" }; // Handle errors gracefully
                        }
                    }

                    let obj = {
                        topic: topic.toString(),
                        partition: partition.toString(),
                        value: parsedValue?.value || "null",
                        parameter: parsedValue?.parameter || "unknown",
                    };

                    messageBuffer.push(obj);

                    if (messageBuffer.length >= BUFFERSIZE) {
                        await flushBuffer();
                    }
                } catch (error) {
                    console.error("❌ Error processing message:", error);
                }
            },
        });
    } catch (error) {
        console.error("❌ Error in consumer.run():", error);
    }
}
(async () => {
    await getConsumerConnection();
    await getMessages();
})()

process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    try {
        await consumer.disconnect();
        console.log("Consumer disconnected successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
    }
});