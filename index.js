const Koa=require('koa')
const path=require('path')
const koabody=require('koa-body')
const app=new Koa()
const Router=require('koa-router')
const router=new Router()
const requiredir=require('require-dir')
const cors=require("koa2-cors")

const routerspath=path.join(__dirname,'api','v1')
//console.log('routespath: '+routerspath)
const routersobj=requiredir(routerspath)
Object.values(routersobj).forEach((item) => {
  const routerr=item
  app.use(routerr.routes(),router.allowedMethods())
});
const usersRouter = new Router({ prefix: '/api/v1' });
app.use(koabody())//接受 响应体传来的数据
app.use(cors())//跨域插件
app.listen('3000',
  (err)=>{
  	if(err){
  		console.log('服务器失败')
  	}else{
  		console.log('服务器启动成功:地址为:http://localhost:3000')
  	}}
  )

app.use(router.routes(),router.allowedMethods())
//app.listen(3000)
