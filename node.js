//node start in my first app
const http = require("http")
const fs = require("fs")
const url = require("url")
const requests = require ("requests")
const portName = "8000";
const hostName = "127.0.0.1";



//home ko get krne ke liye 
const homeFile = fs.readFileSync("index.html","utf-8")

const replaceVal= (temval,orgVal)=>{
let temperature = temval.replace("{%tempval%}",orgVal.main.temp);
temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
temperature = temperature.replace("{%location%}",orgVal.name);
temperature = temperature.replace("{%country%}",orgVal.sys.country);
temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
return temperature;
}
const server = http.createServer((req,res)=>{
if(req.url=="/")
{
    requests("https://api.openweathermap.org/data/2.5/weather?q=Sikar&units=metric&APPID=99a1250d9c57fb22cf2d6997dbc90c0e")
    
    .on("data",(chunk)=>{
   const objData = JSON.parse(chunk)
   const arrayData = [objData];
//    console.log(arrayData)
   const realTimeData = arrayData
   .map((val)=>replaceVal(homeFile,val))
    .join("");
       res.write(realTimeData);
})

    
    .on("end",(err)=>{
        if(err) return console.log("connection close due to  errors ",err);
       res.end();
    });
    
}

else{
    res.end("file not found");
}
})

server.listen(portName,hostName,()=>{
    console.log(`listening in port no ${portName}`)
})
