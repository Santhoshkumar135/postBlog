import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import "./PostList.css"
function PostList(){
    
    const [posts,setposts]=useState([]);
    const [deletepos,setdeletepos]=useState("")
    
    useEffect(()=>{
        const fetchpost=async ()=>{
            try{
            const resp=await axios.get("http://localhost:3000/api/posts", {
                withCredentials: true
              });
              setposts(resp.data)
            }
            catch(err){
                console.log("error",err)
            }
            
        }
        fetchpost();
    },[])
    const deletepost=async(post)=>{
        try{
            const del=await axios.post("http://localhost:3000/api/posts/delete",{postauthorid:post.author._id,postid:post._id},{withCredentials:true})
            console.log(del.data)
            if(!del.data.success){
                setdeletepos("Your are not accessed to delete the post")
                console.log(deletepos)
            }
            else{
                setposts(prev => prev.filter(p => p._id !== post._id));

            }
        }
        catch(err){
            console.log("error")
        }
    }
    if (!posts.length){
        return <div className='pos'><p>no posts available</p></div>
    }
    return (
        <div className='container2'><ul>
        {
            posts.map((post)=>(
                <li key={post._id}><p className='tit'><span>TITLE:</span>{post.title} </p>
                <p className='tit'><span>POST:</span>{post.content}</p>
                <div><button onClick={()=>deletepost(post)}>delete</button></div>
                <p>{deletepos}</p>
                 </li>
            ))
            
        }
    </ul></div>)
    

};
export default PostList