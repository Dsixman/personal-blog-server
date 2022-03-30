const $ =require('../../controller/editblog.js') ;
const verify_token=require('../../model/token_verify')
const Router=require('koa-router') ;
const router =new Router()
router.post('/editblog',verify_token.verify,$.editblog)
module.exports=router