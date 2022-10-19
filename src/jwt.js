const jwt = require("jsonwebtoken");

const jwtS =  jwt.sign({_id:"634cec5a50c6cb62e1e74da4"},"mynameisfoysalahmedshounthiistokendbs",{
    expiresIn:"2  minutes"
})
console.log(jwtS)

const jwtV = jwt.verify(jwtS,"kajfdlk903u4jkhdakjd0fskdf")
console.log(jwtV)