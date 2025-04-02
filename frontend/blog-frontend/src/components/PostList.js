import React,{useEffect,useState} from 'react'
import axios from 'axios'
function PostList({posts}){
    if (!posts.length){
        return <p>no posts available</p>
    }
    return (<ul>
        {
            posts.map((post)=>(
                <li key={post.id}><p>title:{post.title}</p> post:{post.content}</li>
            ))
        }
    </ul>)
    

};
export default PostList