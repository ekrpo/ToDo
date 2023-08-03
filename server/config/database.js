const mysql = require("mysql")
require("dotenv").config()

const {DB_HOST, DB_USER, DB_PORT, DB_DATABASE, DB_PASSWORD} = process.env

const db = mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    port:Number(DB_PORT),
    database:DB_DATABASE,
    password:DB_PASSWORD
})


module.exports = db