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
  const handlelogedin=()=>{
    setlogedin(true)
  }
  const handlelogout=()=>{
    setlogedin(false)
    navigate('/login')

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
        
        
        {islogedin?<Route path="/postform" element={<PostForm/>}/>:<Route path="/postform" element={<Login onLogin={handlelogedin} />}/>}
        {islogedin?<Route path="/visitpost" element={<PostList/>}/>:<Route path='/visitpost' element={<Login onLogin={handlelogedin}/>}/>}
        

        
        

        
      </Routes>
    
    
    
    </div>
  );
}

export default App;
