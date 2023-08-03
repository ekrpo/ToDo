const db = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {tokensBlackList} = require("../config/blacklistedToken")
require("dotenv").config()


async function registerController(req,res){
    const {username, email, password} = req.body
    const SALT = Number(process.env.SALT)
    const hashedPassword = await bcrypt.hash(password, SALT)
    
    const query = "INSERT INTO users (username, email, password) VALUES(?, ?, ?);"
    const values = [username, email, hashedPassword]
    db.query(query, values, (error, result)=>{
        if(error){
            return res.status(400).json({error:error.message})
        }
        return res.json({error:null})
    })
}

function loginController(req,res){
    const {usernameOrEmail, password} = req.body

    db.query(`SELECT id,password FROM users WHERE email='${usernameOrEmail}' or username='${usernameOrEmail}';`, async (error, result)=>{
        if(error){
            return res.status(400).json({error:error.message})
        }
        if(result.length===0){
            return res.status(404).json({error:"This username does not exist"})
        }
        const dbUserData = result[0]
        const isPasswordValid = await bcrypt.compare(password, dbUserData.password)
        if(!isPasswordValid){
            return res.status(400).json({error:"Password is not valid"})
        }
        const token = jwt.sign({id:dbUserData.id}, process.env.JWT_SECRET_KEY, {algorithm:"HS256",expiresIn:"10s"})
        const refreshToken = jwt.sign({id:dbUserData.id}, process.env.JWT_REFRESH_SECRET_KEY, {algorithm:"HS256", expiresIn:"7d"})
        res.cookie("token", token) 
        res.cookie("refresh_token", refreshToken)
        res.json({error:null})
    })


}

function logoutController(req,res){
    const refresh_token = req.cookies["refresh-token"]
    tokensBlackList.push(refresh_token)
    return res.json({error:null})
}


module.exports = {registerController, loginController, logoutController}