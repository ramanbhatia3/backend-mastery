const fs = require("fs");

// Sync... (Synchronous Call)
// fs.writeFileSync("./02-test.txt","Hello there, this is a test file.")

// Async
// fs.writeFile("./02-test.txt","Hello there, this is a test file.", (err)=>{})


// const result = fs.readFileSync("./02-contacts.txt","utf-8")
// console.log(result)
// Sync returns the result


// fs.readFile("./02-contacts.txt","utf-8",(err,result)=>{
//     if (err){
//         console.log("Error:",err)
//     } else{
//         console.log(result);
//     }
// })



// fs.appendFileSync("./02-test.txt",new Date().getDate().toLocaleString())

// fs.appendFileSync("./02-test.txt",`${Date.now()} Hey There!\n`)


// fs.cpSync("./02-test.txt","./02-test-copy.txt")

// fs.unlinkSync("02-test-copy.txt")

// const stats = fs.statSync("02-test.txt")
// console.log(stats)


// fs.mkdirSync("./02-myDocs")

// fs.mkdirSync("./02-myDocss/folder1/folder2",{recursive: true})
