const db = require("../config/database")

function createTask(req,res){
    const {description, important} = req.body
    const publishDateAndTime = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');

    const query = "INSERT INTO tasks (description, publish_time, author, important) VALUES (?, ?, ?, ?);"
    const values = [description, publishDateAndTime, req.user_id, important]
    db.query(query, values, (error, result)=>{
        if(error){
            return res.status(400).json({error:error.message})
        }
        return res.json({error:null})
    })
}

function updateTask(req,res){
    const {description, important} = req.body
    const id = req.params.id

    db.query(`UPDATE tasks SET description='${description}', important=${important} WHERE id=${id} and author=${req.user_id};`,(error,result)=>{
        if(error){
            return res.status(400).json({error:error.message})
        }
        return res.json({error:null})
    })
}
function getTasks(req,res){
    db.query(`SELECT * FROM tasks WHERE author=${req.user_id};`,(error, result)=>{
        if(error){
            return res.status(400).json({error:error.message})
        }
        return res.json(result)
    })
}
function removeTask(req,res){
    const id = req.params.id

    db.query(`DELETE FROM tasks WHERE id=${id} and author=${req.user_id};`, (error, result)=>{
        if(error){
            return res.status(400).json({error:error.message})
        }
        return  res.json({error:null})
    })
}

module.exports = {createTask, updateTask, getTasks, removeTask}