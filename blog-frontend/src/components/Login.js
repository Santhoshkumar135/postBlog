import React,{useState} from "react";
import axios from "axios";
import './Login.css'
import { useNavigate } from "react-router-dom";
function Login({onLogin}){
    const navigate=useNavigate();
    const [logdata,setlogdata]=useState({email:"",password:""})
    const [err,seterr]=useState("")
    const fetchlogdata=async(e)=>{
        e.preventDefault()
        try{
            console.log(logdata)
            const logres=await axios.post("http://localhost:3000/api/users/login",logdata,{withCredentials:true})
            console.log(logres)
            if (logres.data.success){
                onLogin();
                navigate("/postform")
            }



        }
        catch(err){
            seterr("please enter correct email or password")
            console.log("error",err)
             
        }
    }
    const handlelogdata=(e)=>{
        
        setlogdata({...logdata,[e.target.name]:e.target.value})

    }
    
    return (
        <div className="container">
            <div className="box">

                <form onSubmit={fetchlogdata}>
                <div>Login</div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" required id="email" name="email" placeholder="Enter your Email" value={logdata.email} onChange={handlelogdata} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" required id="password" name="password" placeholder="Enter Your password" onChange={handlelogdata} value={logdata.password}/>
                    </div>
                    <div className="forgot"><p>forgot password?</p></div>
                    <div><button type="submit">submit</button></div>
                    <div><p style={{color:'red',fontSize:'15px',textDecoration:'underline'}}>{err}</p></div>
                </form>
            </div>
        </div>
    )
}
export default Login