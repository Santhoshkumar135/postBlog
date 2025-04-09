const express=require('express')
const {User,Post}=require('./model.js')
const mongoose=require('mongoose')
const cors = require("cors");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cookie=require("cookie-parser");
const cookieParser = require('cookie-parser');
mongoose.connect('mongodb://localhost:27017/blog').then(()=>console.log('connected')).catch(()=>console.log('error'))

const app=express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3001',
    credentials:true
}))
const secret="Santhosh"


const authenticate=(req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({msg:"login first"})    
}

jwt.verify(token,secret,(err,user)=>{
    if (err){
        return res.status(401).json({msg:"login failed"})
    }
    req.user=user
    next();

})


}
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
        const token=jwt.sign({"email":email,"_id":result._id},secret,{expiresIn:'1hr'})
        res.cookie("token",token,{ httpOnly: true,
            secure: false, // true if using HTTPS
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
          

        });
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
        const token=jwt.sign({"email":email,"_id":user._id},secret,{expiresIn:'1hr'})
        res.cookie("token",token,{ httpOnly: true,
            secure: false, // true if using HTTPS
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
          

        });
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
app.get("/api/posts",authenticate, async (req, res) => {
    try{
    const posts=await Post.find()
    res.json(posts);
    }
    catch(err){
        console.log('error',err)
    }
    
});
app.post('/api/posts',authenticate,async (req,res)=>{
    try{
    const {title,content}=req.body;
    const author=req.user._id
    console.log(req.user)
    console.log(req.body)
    console.log(title,content,author)
    if(title && content && author){
    const result=await Post.create({title,content,author})
    console.log("hi the result",result)
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
