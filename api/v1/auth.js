const mongoose=require("mongoose")
const Router=require("koa-router")
const dbinit=require("../../model/db_init.js")
const bodyparser=require("koa-bodyparser")
const User=require("../../model/user.js")
const jwt=require("jsonwebtoken")
const router=new Router()

router.post('/auth',(ctx)=>{
    //接收用户名和密码
  let body_data=ctx.request.body
  console.log("body_data:"+body_data)
  let user=body_data.user
  let pwd=body_data.password
  console.log("user:"+user)
  console.log("password:" +pwd)
   // let user='zzh'
   // let pwd='zhenghaihui123'
  let usertoken={}
  // //数据库验证用户是否存在，密码是否正确
  User.findOne({'name':user,'pwd':pwd},function (err, userdata) {
    if (err){
      console.log('select user error: '+err)
    }
    usertoken=userdata
    console.log('user:'+userdata)
  })
  //生成token
   const secret='zjdfh3423'
   const token=jwt.sign(usertoken,secret)
   let response={
     token:token,
     username:user
   }
   ctx.body=response
})

module.exports=router
