const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
    // console.log("New request received")
    const log = `${Date.now()}:${req.url} New Request Received!\n`
    fs.appendFile("./05-logs.txt",log,(err,data)=>{
        switch (req.url){
            case "/":
                res.end("Home Page")
                break
            case "/about-me":
                res.end("I'm Raman")
                break
            case "contact-us":
                res.end("404")
                break
        }
    })
});

myServer.listen(8000,()=> console.log("Server Started!"))