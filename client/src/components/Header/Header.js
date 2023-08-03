import "./header_style.css"
import axios from "axios"
import Cookies from "js-cookie"

function Header(){
    function logout(){
        axios.get("/auth/logout")
        .then(res=>{
            if(!res.data.error){
                Cookies.remove("token")
                Cookies.remove("refresh_token")
                window.location="/login"
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return <header>
        <div id="logo-container">
            <img src="logo.png" alt="logo" id="logo-img"/>
            <h1 id="logo-text">ToDo</h1>
        </div>
        <h3 id="logout" onClick={()=>logout()}>Logout</h3>

    </header>    
}

export default Header