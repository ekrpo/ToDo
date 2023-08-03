const jwt = require("jsonwebtoken")
const refreshToken = require("./refresh.token")
require("dotenv").config()


function verify(req,res,next){
    const token = req.cookies["token"]
    if(!token){
        return res.status(403).json({error:"Token does not exists"})
    }
    try{
        jwt.verify(token, process.env.JWT_SECRET_KEY, {algorithms:["HS256"]})
    }catch (error){
        if(error.name === "TokenExpiredError"){
            refreshToken(req,res)
        }else{
            return res.status(403).json({error:error})
        }
    }
    req.user_id = jwt.decode(token).id
    next()
}

module.exports = verify
