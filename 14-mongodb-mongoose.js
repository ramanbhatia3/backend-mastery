const express = require("express")
const mongoose = require("mongoose")
const fs = require("fs")

const app = express();
const PORT = 8000

// Connection
mongoose
    .connect("mongo url here")
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Error:", err))

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

// Middlware - Plugin
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    console.log("Hello from Middleware 1");
    // return res.json({ message: "Hello from Middleware 1"})

    req.myUserName = "Raman"

    next();
    // return res.end("Hello from Middleware 1")
})

app.use((req, res, next) => {
    console.log("Hello from Middleware 1");
    console.log("User from Middleware 2 is:", req.myUserName);
    // return res.end("Hello from Middleware 2")
    next();
})


// Routes 
app.get("/users", async (req, res) => {
    const allDBUsers = await User.find()
    const html = `
        <ul>
            ${allDBUsers
                .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
                .join("")}
        </ul>
    `;
    res.send(html)
})

app.get("/api/users", async (req, res) => {
    const allDBUsers = await User.find()
    return res.json(allDBUsers)
})

app.get("/api/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ error: `User Not Found` })
    }
    return res.json(user)
})

app.post("/api/users", async (req, res) => {
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required" })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender,
    })

    console.log("Result:", result)
    return res.status(201).json( { msg: "Success" } )

})

app.patch("/api/users/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Doe" })
    return res.json({ status: "Success" })
})

app.delete("/api/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" })
})


app.listen(PORT, () => console.log(`Server started  at PORT:${PORT}`))