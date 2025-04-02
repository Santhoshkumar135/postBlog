import React,{useState} from "react";
import axios from "axios";
function PostForm({onpostadded}){
    const [formdata,setformdata]=useState({title:"",content:"",id:""})
    const handleChange=(e)=>{
        setformdata({...formdata,[e.target.name]: e.target.value})
        onpostadded();

    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const response=await axios.post("http://localhost:3000/api/posts",formdata);
            console.log("formdata",response);
        }
        catch(err){
            console.log("error",err);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <label for="title">Name the title</label>
            <input type="text" id="title" name="title" value={formdata.title} onChange={handleChange}/>
            <br/>
            <label for="content">Enter the Content</label>
            <textarea  id="content" name="content" value={formdata.content} onChange={handleChange}/>
            <br/>
            <label for="id">Enter author id</label>
            <input type="number" id="id" name="id" value={formdata.id} onChange={handleChange}/>
            <button type="submit">submit</button>
        </form>
    )
}
export default PostForm