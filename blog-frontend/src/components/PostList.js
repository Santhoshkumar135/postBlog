import React,{useEffect,useState} from 'react'
import axios from 'axios'
import "./PostList.css"
function PostList({posts}){
    if (!posts.length){
        return <p>no posts available</p>
    }
    return (
        <div className='container'><ul>
        {
            posts.map((post)=>(
                <li key={post.id}><p><span>title:</span>{post.title}</p> <span>post:</span>{post.content}</li>
            ))
            
        }
    </ul></div>)
    

};
export default PostList