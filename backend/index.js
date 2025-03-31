import { kafka } from "./kakfa/client.js";

const admin = kafka.admin();

async function connection() {
    try {
        console.log("Admin is connecting...");
        await admin.connect();
        console.log("Admin is connected.");
    } catch (error) {
        console.log("Error in connection:", error.message);
    }
}

async function createTopics() {
    try {
        const result = await admin.createTopics({
            topics: [
                {
                    topic: "weather-topic",
                    numPartitions: 2,
                },
            ],
        });

        if (result) {
            console.log("Topic created successfully!");
        } else {
            console.log("Topic already exists or failed to create.");
        }
    } catch (error) {
        console.error("Error in topic creation:", error);
    }
}

async function listTopic() {
    try {
        const topics = await admin.listTopics();
        console.log("Existing Topics:", topics);
    } catch (error) {
        console.error("Error listing topics:", error);
    }
}

async function run() {
    await connection();
    await createTopics();
    await listTopic();
    await admin.disconnect();
}

run();  // ✅ Works the same, but requires explicit call
