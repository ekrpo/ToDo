const Joi = require("joi")

const AddTaskSchema = Joi.object({
    description: Joi.string().required().max(255).messages({
        "string.empty":"Description can not be empty",
        "string.max":"Your description of task has to be smaller then 255 characters"
    }),
    important: Joi.number().required().messages({
        "string.empty":"Description can not be empty"
    })
})

module.exports = {AddTaskSchema}