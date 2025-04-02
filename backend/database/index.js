import mongoose from "mongoose";

export async function connectToDB() {
    try {
        const connection = await mongoose.connect(`mongodb+srv://jyotiraditya24:${process.env.DB_PASSWORD}@cluster0.s2wvpf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 sec
            socketTimeoutMS: 45000, // Ensure long enough time to process inserts
        })
        console.log("Connected To DB");
    } catch (e) {
        console.log("Connection Error", e.message)
    }
}