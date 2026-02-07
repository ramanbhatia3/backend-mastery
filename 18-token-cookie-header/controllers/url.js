// const { nanoid } = require("nanoid")
const shortid = require("shortid")
const URL = require("../models/url")

async function handleGenerateShortURL(req, res) {
    const body = req.body;

    if (!body.url) return res.status(400).json({ err: "URL is required" })

    const existingURL = await URL.findOne({ redirectURL: body.url });

    let shortID;

    if (existingURL) {
        // Reuse existing shortID
        shortID = existingURL.shortID;
    } else {
        // Create new short URL
        shortID = shortid();
        await URL.create({
            shortID: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id
        });
    }

    // Fetch all URLs again for table
    const allURLs = await URL.find({});

    return res.render("home", { 
        id: shortID,
        urls: allURLs
     })
}

async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID})
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}    

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics
}