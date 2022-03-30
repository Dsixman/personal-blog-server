const Koa = require('koa')
const path = require('path')
const koabody = require('koa-body')
const app = new Koa()
const jwt = require("jsonwebtoken")
const config = require('./conf/config')
const requiredir = require('require-dir')
const cors = require("koa2-cors")
const mongoose = require('mongoose');
const routerspath = path.join(__dirname, 'api', 'v1')
const routersobj = requiredir(routerspath)
mongoose.connect('mongodb://localhost/personalblog', {useNewUrlParser: true,useUnifiedTopology: true });
const db=mongoose.connection
db.on('error', function(err){
  if (err){
    console.log('connect error: '+err)
    //reject(“连接错误：”+err)
  }
});
db.on('open',function(){
  console.log('connect successed')
})
app.use(koabody())//接受 响应体传来的数据

//跨域插件
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return "*"; // 允许来自所有域名请求
    }
    return 'http://localhost:8080'; //这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Auth-Token', 'Accept'],
}))

Object.values(routersobj).forEach((item) => {
  //router=item
  app.use(item.routes(), item.allowedMethods())
});

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app
