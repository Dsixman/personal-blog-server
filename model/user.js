const mongoose=require("mongoose")
const userSchemal=new mongoose.Schema({
    user_name:String,
    password:String,
    role:String,
    auth:Number
  })
const User=mongoose.model('user',userSchemal,'user')
module.exports=User
