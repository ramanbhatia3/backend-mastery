const fs = require("fs");

console.log("1")

// Blocking
const result = fs.readFileSync("./02-contacts.txt","utf-8");
console.log(result);

console.log("2")
console.log("3")
console.log("4")

// Output: 
// 1
// Ramandeep Bhatia: +919876543210
// Mohit Bhatia: +919884573810
// 2
// 3
// 4


console.log("1")

// Non-Blocking
fs.readFile("./02-contacts.txt","utf-8",(err,result)=>{
    if (err) {
        console.log("Error: ",err)
    } else {
        console.log(result)
    }
});

console.log("2")
console.log("3")
console.log("4")

// Output:
// 1
// 2
// 3
// 4
// Ramandeep Bhatia: +919876543210
// Mohit Bhatia: +919884573810