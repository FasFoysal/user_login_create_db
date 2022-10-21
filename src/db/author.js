const  jwt= require("jsonwebtoken")

const author = async (req,res,next)=>{
    try{
        const genToken = req.cookies.jwt;
        const getTokVerify = jwt.verify(genToken,process.env.SECRET_KEY);
        next();
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports = author;