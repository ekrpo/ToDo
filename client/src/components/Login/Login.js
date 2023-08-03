import {useState} from "react"
import axios from "axios"
import "./login_style.css"

export default function Login(){

    const [userData, setUserData] = useState({
        usernameOrEmail:"",
        password:""
    })
    const [error, setError] = useState(undefined)

    function submitUser(){
        axios.post("/auth/login", userData)
        .then(res=>{
            window.location = "/"
        })
        .catch(err=>{
            setError(err.response.data.error)
            setUserData({...userData, password:""})
        })
    }

    return <main id="login">
        
        <div id="user-form">
            <h2>Login</h2>
            {error ? <p id="error">{error}</p>:""}
            <label htmlFor="username">Username or email
                <input type="text" name="username" id="username" value={userData.usernameOrEmail} onChange={e=>setUserData({...userData, usernameOrEmail:e.target.value})}/>
            </label>
            <label htmlFor="password">Password
                <input type="password" name="password" id="password" value={userData.password} onChange={e=>setUserData({...userData, password:e.target.value})}/>
            </label>
            <span>
                <button id="submit-btn" onClick={()=>submitUser()}>Login</button>
                <p id="another-option-text">If you dont have account, <a href="/register" id="another-option-link">sign up</a> </p>
            </span>
           
        </div>
    </main>
}