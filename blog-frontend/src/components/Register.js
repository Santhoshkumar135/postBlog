import React,{useState} from "react";
import './Register.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate=useNavigate()
    const fetchregdata= async (e)=>{
        e.preventDefault()
        try{
            const resp=await axios.post("http://localhost:3000/api/users/register",regdata);
            console.log(resp)
            navigate("/postform")

        }
        catch(err){

            console.log("error",err);
        }
       

    }
    const [regdata,setregdata]=useState({name:"",email:"",password:""})
    const handleregChange=(e)=>{
        setregdata({...regdata,[e.target.name]:e.target.value})
        
    }
    return (
        <div className="container">
        <div className="box">
        <div>Register</div>
        <form onSubmit={fetchregdata}> 
            <div>
                <p>Username</p>
                <input type="text" required id="name" name="name" onChange={handleregChange} value={regdata.name}/>
            </div>
            <div>
                <p>Email</p>
                <input type="text" required id="email" name="email" onChange={handleregChange} value={regdata.email}/>
            </div>
            <div>
                <p>password</p>
                <input type="password" required id="password" name="password" onChange={handleregChange} value={regdata.password}/>
            </div>
            <div><button onSubmit={fetchregdata}>Submit</button></div>
            </form>
            <div>
                <a href="/login">Login</a>
            </div>
            </div>
        </div>
    )
}
export default Register