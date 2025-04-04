import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostForm.css"
function PostForm({onpostadded}){
    const navigate=useNavigate()
    const [formdata,setformdata]=useState({title:"",content:"",author:""})
    const handleChange=(e)=>{
        setformdata({...formdata,[e.target.name]: e.target.value})
        onpostadded();
        

    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const response=await axios.post("http://localhost:3000/api/posts",formdata);
            //console.log("formdata",response);
        }
        catch(err){
            console.log("error",err);
        }
        navigate("/visitpost")

    }

    return (<>
    <div className="container">
    <div className="box">
        <form onSubmit={handleSubmit}>
        <div className="blog"><p>Post The Blog</p></div>
            <label for="title">Name the title</label>
            <input type="text" id="title" name="title" value={formdata.title} onChange={handleChange}/>
            <br/>
            <label for="content">Enter the Content</label>
            <textarea  id="content" name="content" value={formdata.content} onChange={handleChange}/>
            <br/>
            <label for="author">Enter author id</label>
            <input type="number" id="author" name="author" value={formdata.author} onChange={handleChange}/>
            <button type="submit">submit</button>
        </form>
        <div>
            <a href="/visitpost">wants to visit posts</a>
        </div>
        </div>
        </div>
        
        </>
    )
}
export default PostForm