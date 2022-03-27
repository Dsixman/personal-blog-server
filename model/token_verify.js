const jwt=require("jsonwebtoken")
const config=require('../conf/config')
module.exports={
    verify:function(){
        let auth_token=ctx.request.headers['Auth-Token']
        jwt.verify(auth_token, config.jwt_secret,function(err, decoded) {
            if (err){
                console.log(err)
                return 'token验证失败'
            }else{
                let date=new Date()
                if(date.now()/1000<decoded.exp){
                    return  "token验证成功"
                }
            }
          })
    }
}
