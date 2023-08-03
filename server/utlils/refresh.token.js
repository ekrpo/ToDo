const jwt = require("jsonwebtoken")
const {tokensBlackList} = require("../config/blacklistedToken")
require("dotenv").config()

function refreshToken(req,res){
    const token = req.cookies["refresh_token"]
    if(!token){
        return res.status(400).json("Token does not exists")
    }
    if(tokensBlackList.includes(token)){
        return res.status(400).json("Token is already in blacklist")
    }
    try{
        jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY, {algorithms:["HS256"]})
    }  
    catch (error){
        if(error.name==="TokenExpiredError"){
            res.status(401).json("Refresh token is expired, please go login")
        }else{
            res.status(403).json({error:error})
        }
    }
    const {id} = jwt.decode(token)
    const newToken = jwt.sign({id:id}, process.env.JWT_SECRET_KEY, {algorithm:"HS256", expiresIn:"10s"})
    res.cookie("token", newToken)
}

module.exports = refreshToken