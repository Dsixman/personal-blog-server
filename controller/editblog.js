const User =require('../model/user')

//const { nextObject } = require("mongodb/lib/operations/common_functions")

module.exports.editblog=async function(ctx,next) {
    const username = ctx.request.body.user_name;
    const password = ctx.request.body.pwd;
    await User.findOne({'user_name': username, 'password':password})
    .then(obj=>{
        console.log(obj)
        ctx.body={
            state:'找到用户'
        }
    }).catch(err=>{
        console.log(err)
        ctx.body={
            state:'没有找到用户'
        }
    })
    await next()
}