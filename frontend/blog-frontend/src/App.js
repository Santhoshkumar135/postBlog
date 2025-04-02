import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import axios from 'axios';
import { useState,useEffect } from 'react';
function App() {
  const [posts,setposts]=useState([]);
  const [loading,setloading]=useState(true)
    const fetchpost=async ()=>{
      try{
          const response=await axios.get("http://localhost:3000/api/posts")
          
            setloading(false)
            setposts(response.data)
            console.log(response.data)
      }
      catch(err){
            setloading(false)
            console.log("error",err)}
    }
    console.log("hi hello",posts)
    
    useEffect(()=>{
      const fetchData = async () => {
        await fetchpost();
      };
      fetchData();
      },[])
    const handlepost=()=>{
      fetchpost();
    }
    if (loading){
        return <p>Loading...</p>
    }
  return (
    <div>
    <PostList posts={posts}/>
    <PostForm onpostadded={handlepost}/>
    </div>
  );
}

export default App;
