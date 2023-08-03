const authRoute = require("express").Router()
const {registerController, loginController, logoutController} = require("../controllers/auth.controller")
const validateSchema = require("../validation/validation")
const {RegisterSchema, LoginSchema} = require("../validation/auth.validator")
const refreshToken = require("../utlils/refresh.token")

authRoute.post("/register",validateSchema(RegisterSchema), registerController)
authRoute.post("/login", validateSchema(LoginSchema), loginController)
authRoute.get("/refreshtoken", refreshToken)
authRoute.get("/logout", logoutController)

module.exports = authRoute