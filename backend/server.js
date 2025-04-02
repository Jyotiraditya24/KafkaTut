import express from "express";
import { connectToDB } from "./database/index.js"
import dotenv from "dotenv"

const app = express();
dotenv.config();

app.listen(4000,()=>{
    console.log("Connected to Server");
    connectToDB();
})

console.log(process.env)