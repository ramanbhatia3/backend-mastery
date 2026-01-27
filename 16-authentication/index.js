const express = require("express")
const path = require("path")

const { connectToMongoDB } = require("./connection.js")

const route = require("./routes/staticRouter.js")
const userRoute = require("./routes/user.js")

const app = express();
const PORT = 8000;

connectToMongoDB("mongo url here").then(() => console.log("MongoDB Connected Successfully!")).catch((err) => console.log("MongoDb Connection Failed:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", route)

app.use("/user", userRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

