const Router=require("koa-router")
let router = new Router();
router.get('/about',async(ctx)=>{
    ctx.body ='这是about页面';
})

module.exports=router