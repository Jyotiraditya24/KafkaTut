import { kafka } from "../kakfa/client.js";

const producer = kafka.producer();

async function startProducer() {
    try {
        await producer.connect();
        console.log("✅ Producer connected");

        const intervalId = setInterval(async () => {
            try {
                await generateHumidityData();
            } catch (error) {
                console.error("❌ Error generating data:", error);
            }
        }, 500);

        setTimeout(async () => {
            clearInterval(intervalId);
            console.log("⏹Stopping producer...");
            try {
                await producer.disconnect();
                console.log(" Producer disconnected");
            } catch (error) {
                console.error("Error disconnecting producer:", error);
            }
        }, 10000);
    } catch (error) {
        console.log(" Error in startProducer:", error);
    }
}

//Generate & send data
async function generateHumidityData() {
    let data = {
        value: Math.ceil(Math.random() * 100), // 1-100%
        parameter: "humidity"
    };
    console.log("🌡️ Generated Humidity:", data);
    await sendHumidityData(data);
}

// Send data to Kafka
async function sendHumidityData(data) {
    try {
        await producer.send({
            topic: "weather-topic",
            messages: [{ key: String(data), value: JSON.stringify(data), partition: 0 }],
        });
        console.log("Sent Humidity Data:", data);
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

startProducer();
