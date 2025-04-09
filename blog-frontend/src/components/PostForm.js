import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostForm.css"
function PostForm(){
   
  const [error,seterror]=useState(false);
  const [loading,setloading]=useState(true)
  const navigate=useNavigate()
  const [formdata,setformdata]=useState({title:"",content:""})
    
   
    

    const handleChange=(e)=>{
        setformdata({...formdata,[e.target.name]: e.target.value})
        

    }
    
      
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const response=await axios.post("http://localhost:3000/api/posts",formdata,{withCredentials:true});
            
            navigate("/visitpost")
            //console.log("formdata",response);
        }
        catch(err){
            seterror(true)
            console.log("error",err);
        }
        
        

    }
    if(error){
        return <p>Could n't post the Blog</p>
    }
    return (<>
    <div className="container">
    <div className="box">
        <form onSubmit={handleSubmit}>
        <div className="blog"><p>Post The Blog</p></div>
            <label htmlFor="title">Name the title</label>
            <input type="text" id="title" name="title" required value={formdata.title} onChange={handleChange}/>
            <br/>
            <label htmlFor="content">Enter the Content</label>
            <textarea  id="content" required name="content" value={formdata.content} onChange={handleChange}/>
            <br/>
            
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