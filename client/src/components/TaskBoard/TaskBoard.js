import "./taskboard_style.css" 
import {useEffect, useState} from "react"
import axios from "axios"
import {AiOutlineClose, AiOutlineCheck} from "react-icons/ai"

export default function TaskBoard(){
    const [taskData, setTaskData] = useState({
        description:"",
        important:0
    })

    const [tasks, setTasks] = useState([])

    function discardTask(){
        setTaskData({
            description:"",
            important:0
        })
    }

    const [error, setError] = useState(undefined)

    function addTask(){
        axios.post("/task/create", taskData)
        .then(res=>{
            if(tasks.length===0){
                collectTasks()
            }else{
                taskData.id=tasks[0].id + 1
            }
            setTasks([...tasks, taskData])
            discardTask()
        })
        .catch(err=>{
            setError(err.response.data.error)
        })
    }

    function collectTasks(){
        axios.get("/task/all")
        .then(res=>{
            setTasks(res.data)
        })
        .catch(err=>{
            window.location="/login"
        })
    }

    const [edit, setEdit] = useState(false)
    function editTask(task){
        axios.post(`/task/update/${task.id}`, taskData)
        .then(res=>{
            tasks[tasks.indexOf(task)] = {
                id:task.id,
                description:taskData.description,
                important: taskData.important
            }
            setTaskData({
                description:"",
                important: 0
            })
            setEdit(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function removeTask(id){
        axios.delete(`/task/remove/${id}`)
        .then(res=>{
            setTasks(tasks.filter(task=>task.id!==id))
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function closeEdit(){
        setEdit(false)
        setTaskData({
            description:"",
            important:0
        })
    }

    useEffect(()=>{
        collectTasks()
    },[])

    return <main id="task-board">
        <span></span>
        <div id="task-form">
           <h3 id="task-form-title">Create your task</h3> 
           {error ? <p id="error">{error}</p>:""}
           <div id="form-container">
                <textarea id="task-desc" placeholder="Enter your task description" value={taskData.description} onChange={e=>setTaskData({...taskData, description:e.target.value})}></textarea>
                <label>Is this task important?
                    <input type="checkbox" id="important" name="important" value={taskData.important} onChange={e=>setTaskData({...taskData, important:taskData.important===0 ? 1:0})}></input>
                </label>
                <div id="buttons">
                    <button id="discard-btn" onClick={()=>discardTask()}>Discard</button>
                    <button id="add-btn" onClick={()=>addTask()}>Add</button>
                </div>
           </div>
        </div>
        <div id="task-list">
                {tasks.map(task=>{
                    return <div id="task" className={task.important !== 0 ? "important-task":"not-important-task"}>
                        {edit && task.id===edit ? <textarea id="u-task-description" value={taskData.description} onChange={(e)=>setTaskData({...taskData, description:e.target.value})}></textarea>:<p id="task-description">{task.description}</p>}
                        {edit && task.id===edit ? <label id="u-label" htmlFor="u-important">Is important<input type="checkbox" id="u-important" value={task.important} onChange={()=>setTaskData({...taskData, important:taskData.important===0 ? 1:0})}/></label>:""}
                        {edit && task.id===edit ? <div id="btn-group">
                            <AiOutlineClose id="close" onClick={()=>closeEdit()}/>
                            <AiOutlineCheck id="check" onClick={()=>editTask(task)}/>
                        </div>
                        :
                        <div id="btn-group">
                            <button id="edit-btn" className="task-btns" onClick={()=>setEdit(task.id)}>Edit</button>
                            <button id="remove-btn" className="task-btns" onClick={()=>removeTask(task.id)}>Remove</button>
                        </div>
                        }
                    </div>
                })}
        </div>
    </main>
}