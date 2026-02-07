const { getUser } = require("../service/auth.js")

async function restrictToLoggedInUserOnly(req, res, next){
    // const userUid = req.cookies?.uid;
    const userUid = req.headers?.["authorization"];

    if (!userUid) return res.redirect('/login');

    const token = userUid.split("Bearer ")[1]; // "Bearer 3bn4ifn44ifj"

    const user = await getUser(token);
    // const user = await getUser(userUid);

    if (!user) return res.redirect('/login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    // const userUid = req.cookies?.uid;
    const userUid = req.headers?.["authorization"];

    const token = userUid.split("Bearer ")[1]; // "Bearer 3bn4ifn44ifj"

    const user = await getUser(token);

    // const user = await getUser(userUid);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}