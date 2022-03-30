const jwt=require('jsonwebtoken')
const config=require('../conf/config')
async function verify(ctx,next){
    console.log(ctx.request.headers["auth-token"])
    //console.log(ctx.request.headers["Auth-Token"])
    let token = ctx.request.headers["auth-token"]
    let tkcontent;
   try{
       tkcontent=await jwt.verify(token, config.jwt_secret)} 
   catch(err){
    switch (err.name) {
        case 'JsonWebTokenError':
            ctx.throw(401,'token验证失败')
          break;
        case 'TokenExpiredError':
            ctx.throw(401,'token过期')
          break;
      }
   }
    await next()
}
module.exports.verify=verify
