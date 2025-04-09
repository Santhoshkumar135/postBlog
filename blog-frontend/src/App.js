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
  const handlelogedin=()=>{
    setlogedin(true)
  }
  useEffect(()=>{
    const checkAuth=async ()=>{
      try{
      const logincheck=await axios.get("http://localhost:3000/api/me",{withCredentials:true})
      console.log(logincheck)
      if(logincheck.data.success){
        setlogedin(true)
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
  const handlelogout=()=>{
    setlogedin(false)
    navigate('/login')

  }
  if(loading){
    return <p>loading...</p>
  }
  
  return (
    <div>
    {console.log(islogedin)}
    {islogedin && <div>
    <button onClick={handlelogout}>Logout</button>

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
