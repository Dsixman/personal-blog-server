const mongoose=require("mongoose")
const blogSchemal=new mongoose.Schema({
    title:String,
    category:String,
    content:String,
    state:String
  })
const blog=mongoose.model('blog',blogSchemal,'blog')
module.exports=blog
