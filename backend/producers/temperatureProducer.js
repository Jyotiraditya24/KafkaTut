function generateTemperatureData(){
    const data = Math.floor(Math.random() * 101) - 50; 
    console.log("temprature generated " + data);
}

const intervalId = setInterval(()=>{
    generateTemperatureData()
},500);

setTimeout(()=>{
    clearInterval(intervalId);
},10000)