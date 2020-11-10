 const mongoose = require('mongoose');
 //第一种方法 直接引用就行了
//  module.exports=new Promise((resolve,reject)=>{
//    mongoose.connect('mongodb://localhost/personblog', {useNewUrlParser: true,useUnifiedTopology: true });
//    const db=mongoose.connection
//    db.on('error', function(err){
//      if (err){
//        console.log(err)
//        reject("连接错误: "+err)
//      }
//    });
//    db.on('open',function(){
//      console.log('connect successed')
//      resolve()
//    })
//  }
// )

//第二种方法
module.exports=function(){
  mongoose.connect('mongodb://localhost/personblog', {useNewUrlParser: true,useUnifiedTopology: true });
  const db=mongoose.connection
  db.on('error', function(err){
    if (err){
      console.log('connect error: '+err)
      //reject(“连接错误：”+err)
    }
  });
  db.on('open',function(){
    console.log('connect successed')
    //resolve()
  })
}
