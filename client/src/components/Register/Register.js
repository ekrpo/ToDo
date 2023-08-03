import {useState} from "react"
import axios from "axios"
import "./register_style.css"

export default function Register(){

    const [userData, setUserData] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [error, setError] = useState(undefined)

    function submitUser(){
        axios.post("/auth/register", userData)
        .then(res=>{
            window.location = "/login"
        })
        .catch(err=>{
            setError(err.response.data.error)
            
        })
    }

    return <main id="register">
        
        <div id="user-form">
            <h2>Register</h2>
            {error ? <p id="error">{error}</p>:""}
            <label for="username">Username
                <input type="text" name="username" id="username" value={userData.username} onChange={e=>setUserData({...userData, username:e.target.value})}/>
            </label>
            <label for="email">Email
                <input type="text" name="email" id="email" value={userData.email} onChange={e=>setUserData({...userData, email:e.target.value})}/>
            </label>
            <label for="password">Password
                <input type="password" name="password" id="password" value={userData.password} onChange={e=>setUserData({...userData, password:e.target.value})}/>
            </label>
            <label for="confirmPassword">Confirm password
                <input type="password" name="confirmPassword" id="confirmPassword" value={userData.confirmPassword} onChange={e=>setUserData({...userData, confirmPassword:e.target.value})}/>
            </label>
            <span>
                <button id="submit-btn" onClick={()=>submitUser()}>Login</button>
                <p id="another-option-text">If you already have account, <a href="/login" id="another-option-link">sign in</a> </p>
            </span>
        </div>
    </main>
}