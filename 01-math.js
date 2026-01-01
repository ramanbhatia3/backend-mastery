function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

// module.exports = {
//     add,
//     sub
// }

// module.exports = {
//     addFN: add,
//     subFN: sub
// }

exports.add = (a,b) => a+b;
exports.multiply = (a,b) => a*b;