import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'Weather',
    brokers: ['localhost:9092']
})


console.log(kafka)