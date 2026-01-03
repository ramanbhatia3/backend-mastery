const http = require("http");
const fs = require("fs");
const url = require("url")


const myServer = http.createServer((req, res) => {
    // console.log("New request received")
    if (req.url === "/favicon.ico") return res.end();

    const log = `${Date.now()}:${req.method} ${req.url} New Request Received!\n`
    const myUrl = url.parse(req.url, true)

    fs.appendFile("./05-logs.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                if (req.method === "GET") res.end("Home Page")
                break
            case "/signup":
                if (req.method === "GET") res.end("This is a signup form.")
                else if(req.method === "POST"){
                    // DB Query
                    res.end("SUCCESS")
                }
                break
            case "/about-me":
                const username = myUrl.query.myName
                res.end(`Hi, ${username}`)
                break
            case "/search":
                const search = myUrl.query.search_query
                res.end(`Here are your results for ` + search)
                break
            default:
                res.end("404")
                break
        }
    })
});

myServer.listen(8000, () => console.log("Server Started!"))