const mongoose=require("mongoose")
const userSchemal=new mongoose.Schema({
    name:String,
    pwd:String,
    role:String,
    authority:Number,
    icon:String,
    email:String
  })
const User=mongoose.model('user',userSchemal,'user')
module.exports=User
