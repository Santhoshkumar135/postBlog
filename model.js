const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    }
});
const anotherSchema=new mongoose.Schema({
    title:{
        type:String
        
    },
    content:{
        type:String
    },
    author:{
        type:Number
    }
})
const user=mongoose.model("User",userSchema);
const Post=mongoose.model("post",anotherSchema);
module.exports={user,Post};