const fs = require("fs");

function testMiddleware(string){
    return (req, res, next) => {
        console.log(`Hello from ${string}`);
        next();
    }
}

module.exports = {
    testMiddleware,
}