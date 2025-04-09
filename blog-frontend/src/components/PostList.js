import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import "./PostList.css"
function PostList(){
    
    const [posts,setposts]=useState([]);
    
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
    if (!posts.length){
        return <p>no posts available</p>
    }
    return (
        <div className='container2'><ul>
        {
            posts.map((post)=>(
                <li key={post._id}><p className='tit'><span>TITLE:</span>{post.title} </p>
                <p className='tit'><span>POST:</span>{post.content}</p>
                 </li>
            ))
            
        }
    </ul></div>)
    

};
export default PostList