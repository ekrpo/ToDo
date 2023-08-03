const express = require("express")
const cookieParser = require("cookie-parser")
const db = require("./config/database")
const authRoute = require("./routes/auth.route")
const taskRoute = require("./routes/task.toute")
const verify = require("./utlils/verify.token")
const cors = require("cors")
require("dotenv").config()

const server = express()
db.connect((err)=>{
    err ? console.log(err) : console.log("Server is connected with database")
})
const PORT = process.env.SERVER_PORT

server.use(express.json())
server.use(cookieParser())
server.use(cors())

server.use("/auth", authRoute)
server.use("/task", verify,taskRoute)

server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})