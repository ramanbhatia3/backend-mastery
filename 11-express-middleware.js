const express = require("express")
const fs = require("fs")
const users = require("./09-data.json")

const app = express();
const PORT = 8000

// Middlware - Plugin
app.use(express.urlencoded({ extended: false }))

app.use((req,res,next)=>{
    console.log("Hello from Middleware 1");
    // return res.json({ message: "Hello from Middleware 1"})

    req.myUserName = "Raman"

    next();
    // return res.end("Hello from Middleware 1")
})

app.use((req,res,next)=>{
    console.log("Hello from Middleware 1");
    console.log("User from Middleware 2 is:", req.myUserName);
    // return res.end("Hello from Middleware 2")
    next();
})

app.get("/users",(req, res)=>{
    const html = `
        <ul>
            ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html)
})

app.get("/api/users",(req, res)=>{
    console.log("I'm in get route", req.myUserName);
    return res.json(users)
})

app.get("/api/users/:id",(req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return res.json(user)
})

app.post("/api/users",(req, res)=>{
    const body = req.body
    // console.log("BODY:",body)
    users.push({...body,id: users.length + 1})
    fs.writeFile("./09-data.json",JSON.stringify(users),(err, data) => {
        return res.json({ status: "success", id: users.length })
    })
})

app.patch("/api/users/:id",(req, res)=>{
    // TODO: Edit the user with id
    return res.json({ status: "pending" })
})

app.delete("/api/users/:id",(req, res)=>{
    // TODO: Delete the user with id
    return res.json({ status: "pending" })
})


app.listen(PORT, () => console.log(`Server started  at PORT:${PORT}`))