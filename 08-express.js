const express = require("express")

const app = express();

app.get("/",(req, res)=>{
    return res.send("Hello from Home Page")
})

app.get("/about",(req, res)=>{
    // return res.send("Hello from Ramandeep Bhatia")
    return res.send("Hello from Ramandeep Bhatia" + " Hey " + req.query.user)
})

app.listen(8000, () => console.log("Server Started!"))