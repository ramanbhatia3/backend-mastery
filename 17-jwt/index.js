const express = require('express');
const path = require('path');

const cookieParser = require("cookie-parser");

const { connectToMongoDB } = require("./connect.js")

const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth.js")
const URL = require("./models/url.js")

const urlRoute = require("./routes/url.js")
const staticRoute = require("./routes/staticRouter.js")
const userRoute = require("./routes/user.js")


const app = express();
const PORT = 8000;

connectToMongoDB("mongo url here").then(() => console.log("MongoDB Connected Successfully!")).catch((err) => console.log("MongoDb Connection Failed:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute)
app.use("/", checkAuth, staticRoute);


app.get("/url/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate({
    shortID
  }, {
    $push: {
      visitHistory: { timestamp: Date.now() }
    }
  })
  res.redirect(entry.redirectURL);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});