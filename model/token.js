const mongoose=require('mongoose');
const schema=mongoose.Schema;
const tokenschema=new schema({
    _userid:{
        type:schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    token:{
        type:String,
        required:true
    },
    expireAt:{
        type:Date,
        default:Date.now,
        index:{
            expires:86400000
        }
    }
})
const tokenmodel=mongoose.model('token',tokenschema)
module.exports=tokenmodel