const express = require("express")

const { connectMongoDB } = require("./15-connection.js")
const { testMiddleware } = require("./middlewares")
const userRouter = require("./routes/user.js")

const app = express();
const PORT = 8000

// Connection
connectMongoDB("monogo url here").then(() => console.log("MongoDB Connected Successfully!"))

// Middlware - Plugin
app.use(express.urlencoded({ extended: false }))

app.use(testMiddleware("Global Middleware"))


// Routes
app.use("/api/users", userRouter)

app.listen(PORT, () => console.log(`Server started  at PORT:${PORT}`))