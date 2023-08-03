const taskRoute = require("express").Router()
const {createTask, updateTask, getTasks, removeTask} = require("../controllers/task.controller")
const validateSchema = require("../validation/validation")
const {AddTaskSchema} = require("../validation/task.validator")


taskRoute.post("/create", validateSchema(AddTaskSchema), createTask)
taskRoute.post("/update/:id", updateTask)
taskRoute.get("/all", getTasks)
taskRoute.delete("/remove/:id", removeTask)


module.exports = taskRoute