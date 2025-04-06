const express=require('express')
const {User,Post}=require('./model.js')
const mongoose=require('mongoose')
const cors = require("cors");
const bcrypt=require("bcrypt")
mongoose.connect('mongodb://localhost:27017/blog').then(()=>console.log('connected')).catch(()=>console.log('error'))

const app=express();
app.use(express.json());
app.use(cors())
app.post('/api/users/register',async (req,res)=>{
    
        const name=req.body.name;
        const email=req.body.email;
        
        const password=await bcrypt.hash(req.body.password,13);
        if (!name || !email || !password){
            return res.status(400).json({msg:"missing field"})
        }
        const alreadyuser=await User.findOne({"email":email})
        
        if (alreadyuser){
            
            return res.status(400).json({msg:"email already exits"})
        }
        
        console.log(password)
        try{
        const result= await User.create({
            name,email,password
        })
        return res.status(200).json({msg:'success'})
    }catch(err){
        return res.status(500).json({ msg: 'Error registering user', error: err.message });
    }
       
    
})
app.post('/api/users/login',async (req,res)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
    console.log(email,password)
    const user=await User.findOne({'email':email})
    if (!user){
        
            return res.status(404).json({success:false,msg:'email not found'})
        
    }
    console.log(user)
    const valid=await bcrypt.compare(password,user.password)
    if (valid){
        console.log("sucessfully logined")
        return res.status(200).json({success:true,msg:'success'})
    }
    else{
        console.log("unsucessful")
        return res.status(404).json({success:false,msg:'password not found'})
    }}
    catch(err){
        return res.status(500).json({success:false,error:err.message})
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
    const {title,content,author}=req.body;
    console.log(req.body)
    console.log(title,content,author)
    if(title && content && author){
    const result=await Post.create({title,content,author})
    console.log(result)
    return res.status(200).json({msg:'success'})}
    else{
        return res.json({msg:"unsucessful"})
    }
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }

})
app.listen(3000,()=>console.log('server started'))
