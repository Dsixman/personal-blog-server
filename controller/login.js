const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../conf/config')
const redis = require('redis');
const redisClient = redis.createClient(6379, '127.0.0.1');
module.exports.login = async function (ctx, next) {
    //console.log(ctx.request.headers["auth-token"])
    //console.log(ctx.request.headers["Auth-Token"])
    const username = ctx.request.body.user_name;
    const password = ctx.request.body.pwd;
    // let usertoken={}
    console.log(ctx.request.body)
    console.log(config.jwt_secret)
    await User.findOne({ 'user_name': username, 'password': password })
        .then(userdata => {
            // console.log(userdata)
            let usertoken = { 'user_name': userdata.user_name, 'iat': (Date.now() / 1000) - 30, 'exp': (Date.now() / 1000) + (60 * 60 * 24 * 7) }
            const token = jwt.sign(usertoken, config.jwt_secret)
            let response = {
                token: token,
                username: userdata.user_name,
            };
//            ctx.body = response
 //               let result;
                (async function () {
                    redisClient.on('error', (err) => console.log('Redis Client Error', err))
                    let result = await redisClient.set(userdata.user_name, token)
                    let value=await redisClient.get(userdata.user_name)
                    console.log('value')
                    console.log(value)
                    console.log(result)
                    console.log(token)
                    if (result) {        
                        console.log('存贮成功: '+value)
                        ctx.body = response
                    }
                })();
        })
        .catch(err => {
            console.log(err)
            ctx.body = {
                state: '没有找到用户'
            }
        })
    await next()
}