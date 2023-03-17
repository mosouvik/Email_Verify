const mongoose=require('mongoose');
const schema=mongoose.Schema;
const Userschema=new schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isVerified:{

        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    }
})
const usermodel=mongoose.model('user',Userschema)
module.exports=usermodel;