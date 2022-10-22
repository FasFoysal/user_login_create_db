const  jwt= require("jsonwebtoken");
const friend_family = require("./conn");

const author = async (req,res,next)=>{
    try{
        const genToken = req.cookies.jwt;
        const getTokVerify = jwt.verify(genToken,process.env.SECRET_KEY);
        const verifyData = await friend_family.findOne({_id:getTokVerify._id});
        console.log(verifyData)
        next();
    }catch(err){
        res.render("login")
    }
}

module.exports = author;