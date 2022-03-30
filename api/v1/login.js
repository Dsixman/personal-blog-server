const $ =require('../../controller/login.js') ;
const Router=require('koa-router') ;
const router =new Router()
router.post('/login',$.login)
module.exports=router