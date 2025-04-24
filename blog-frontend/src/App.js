import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Register from './components/Register';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import axios from 'axios';
import Login from './components/Login';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
function App() {
  const navigate=useNavigate();
  const [islogedin,setlogedin]=useState(false)
  const [loading,setloading]=useState(true)
  const [bloger,setbloger]=useState("")
  const handlelogedin=async()=>{
    try{
      const l=await axios.get("http://localhost:3000/api/me",{withCredentials:true})
      console.log("fucker",l.data,l.data.user)
    setbloger(l.data.user)
    }
    catch(err){
      console.log("error",err)
    }
    setlogedin(true)
  }
  useEffect(()=>{
    const checkAuth=async ()=>{
      try{
      const logincheck=await axios.get("http://localhost:3000/api/me",{withCredentials:true})
      console.log("fucker",logincheck)
      if(logincheck.data.success){
        setlogedin(true)
        setbloger(logincheck.data.user)
        
      }
      else{
        setlogedin(false)
      }

      }
      catch(err){
        setlogedin(false)
      }
      finally{
        setloading(false)
      }
    }
    checkAuth();
  },[]);
  const handlelogout= async ()=>{
    try{
      await axios.post("http://localhost:3000/api/logout",{},{withCredentials:true}) 
      setlogedin(false)
    navigate('/login')

    }
    catch(err){
      console.log("error")
      return <p>ther is an error</p>
    }

  }
  if(loading){
    return <p>loading...</p>
  }
  
  return (
    <div>
    {console.log(islogedin)}
    {islogedin && <div className='logout'>
    <button onClick={handlelogout}>Logout</button>
    <p>Welcome {bloger}</p>
    

</div>}
    
    {/*<PostList posts={posts}/>
    <PostForm onpostadded={handlepost}/>*/}
    {/*<Register/>*/}
    
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path='/login' element={<Login onLogin={handlelogedin} />}/>
        
        
        <Route
          path="/postform"
          element={islogedin ? <PostForm /> : <Login onLogin={handlelogedin} />}
        />
        <Route
          path="/visitpost"
          element={islogedin ? <PostList /> : <Login onLogin={handlelogedin} />}
        />
        
        

        
      </Routes>
    
    
    
    </div>
  );
}

export default App;
