import express from "express";
import { connectToDB } from "./database/index.js"
import dotenv from "dotenv"
import Sensor from "./database/models/SensorModel.js";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

app.get('/serverData',async(req,res)=>{
    try {
        const data = await Sensor.find().sort().limit(50);
        res.json(data);
    } catch (error) {
        console.log("Error in sever Data api" + e.message);
    }
})

app.listen(3001,()=>{
    console.log("Connected to Server");
    connectToDB();
})
