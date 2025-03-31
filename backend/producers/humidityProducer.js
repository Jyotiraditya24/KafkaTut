import { kafka } from "../kakfa/client.js"

const producer = kafka.producer();


// i have to generate continous data lets say in percentage
function generateHumidityData() {
    const data = Math.ceil((Math.random() * 100)); //  generate a random number between 1 and 100
    console.log("Humidity Generated " + data);
}

const intervalId = setInterval(() => {
    generateHumidityData();
}, 500)

setTimeout(() => {
    clearInterval(intervalId)
}, 10000)


async function sendHumidityData(){
    
}