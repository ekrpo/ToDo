const Joi = require("joi")

const RegisterSchema = Joi.object({
    username: Joi.string().max(50).required().messages({
        "string.max":"Username length has to be smaller than 50 characters",
        "string.empty":"Username field can not be empty"
    }),
    email: Joi.string().email().max(255).required().messages({
        "string.empty":"Email field can not be empty",
        "string.max":"Email length has to be smaller than 255 characters"
    }),
    password: Joi.string().min(8).max(1023).regex(/^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/).required()
    .messages({
        "string.empty":"Password field can not be empty",
        "string.min":"Password field must have minimum 8 charcaters",
        "string.pattern.base":"Password must have minimum one number and one special character."
    }),
    confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
        "string.pattern.base":"Passwords do not match"
    })
})

const LoginSchema = Joi.object({
    usernameOrEmail: Joi.string().required().messages({
        "string.empty":"Username or Email field can not be empty"
    }),
    password: Joi.string().required({
        "string.empty":"Password field can not be empty"
    })
})


module.exports = {RegisterSchema, LoginSchema}