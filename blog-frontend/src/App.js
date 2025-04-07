import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Register from './components/Register';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import axios from 'axios';
import Login from './components/Login';
import { useState,useEffect } from 'react';
function App() {
  
  return (
    <div>
    {/*<PostList posts={posts}/>
    <PostForm onpostadded={handlepost}/>*/}
    {/*<Register/>*/}
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/postform" element={<PostForm/>}/>
        <Route path="/visitpost" element={<PostList/>}/>
        <Route path='/login' element={<Login/>}/>
        

        
      </Routes>
    </Router>
    
    
    </div>
  );
}

export default App;
