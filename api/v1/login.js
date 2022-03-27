const Db=require("../../model/db_init.js")
const User=require("../../model/user.js")
const jwt=require("jsonwebtoken")
const config=require('../../conf/config')
const Router=require("koa-router")
const router=new Router()
const redis = require('redis');
const redisClient = redis.createClient( 6379, '127.0.0.1');
router.post('/login', (ctx)=>{
    Db.connect()
    redisClient.on('error',function(err){
      console.log(err)
    })
    //接收用户名和密码
  let body_data=ctx.request.body
  //console.log("body_data:")
  //console.log(body_data)
  let user=body_data.user_name
  let pwd=body_data.pwd

  //登录功能, token 被redis删除后要到mongdb查询一下是否有这个用户
 let usertoken={}
  //数据库验证用户是否存在，密码是否正确  
  User.findOne({'user_name':user,'password':pwd},function (err, userdata) {
    if (err){
      console.log('select user error: '+err)
    }
    usertoken={'user_name':userdata.user_name,'iat':(Date.now() / 1000)-30,'exp':(Date.now() / 1000)+(60*60*24*7)}
    console.log('user:'+userdata)
  })
  
  //重新生成token
  
   const token=jwt.sign(usertoken,config.jwt_secret)
   let response={
     token:token,
     username:user,
   }
   ctx.body=response
   redisClient.set(user, token, function(err, obj) {
      if (err){
        //console.log(err)
        //response["state"]="没有token"
        let res={'state':err}
        ctx.status=403
        ctx.body="服务器设置token失败"
      }else{
          //response["state"]="token存贮成功"
          console.log('存贮成功',+redisClient.get(user))

          ctx.body=response
      }
   })

})

// router.get('/',async(ctx)=>{
//     ctx.body="这是前台首页";
// })


// router.get('/news',async(ctx)=>{
//     ctx.body ='这是前台新闻页面';
// })


module.exports=router