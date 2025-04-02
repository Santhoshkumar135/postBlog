const express=require('express')
const {User,Post}=require('./model.js')
const mongoose=require('mongoose')
const cors = require("cors");
mongoose.connect('mongodb://localhost:27017/blog').then(()=>console.log('connected')).catch(()=>console.log('error'))

const app=express();
app.use(express.json());
app.use(cors())
app.post('/api/users/register',async (req,res)=>{
    
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        try{
        const result= await User.create({
            name,email,password
        })
        return res.status(200).json({msg:'success'})
    }catch(err){
        return res.status(500).json({ msg: 'Error registering user', error: error.message });
    }
       
    
})
app.post('/api/users/login',async (req,res)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({'email':email})
    if (!user){
        
            return res.status(404).json({msg:'email not found'})
        
    }
    if (password===user.password){
        return res.status(200).json({msg:'success'})
    }
    else{
        return res.status(404).json({msg:'password not found'})
    }}
    catch(err){
        return res.status(500).json({error:err.message})
    }

})
app.get("/api/posts", async (req, res) => {
    try{
    const posts=await Post.find()
    res.json(posts);
    }
    catch(err){
        console.log('error',err)
    }
    
});
app.post('/api/posts',async (req,res)=>{
    try{
    const {title,content,authorid}=req.body;
    if(title && content && authorid){
    const result=await Post.create({title,content,authorid})
    return res.status(200).json({msg:'success'})}
    else{
        alert('enter all details');
    }
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }

})
app.listen(3000,()=>console.log('server started'))
