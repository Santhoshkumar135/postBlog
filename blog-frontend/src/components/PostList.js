import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import "./PostList.css"
function PostList(){
    const location=useLocation();
    
    const posts=location.state;
    if (!posts.length){
        return <p>no posts available</p>
    }
    return (
        <div className='container2'><ul>
        {
            posts.map((post)=>(
                <li key={post.id}><p className='tit'><span>TITLE:</span>{post.title} </p>
                <p className='tit'><span>POST:</span>{post.content}</p>
                 </li>
            ))
            
        }
    </ul></div>)
    

};
export default PostList