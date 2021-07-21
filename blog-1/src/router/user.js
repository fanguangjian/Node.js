const { login } = require("../controller/user")
const { SuccessModel, ErrorModel} = require("../model/resModel")
const { set } = require('../db/redis')

//获取Cookie过期时间
// const getCookieExpires = () => {
//     const d = new Date()
//     d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
//     console.log("d.toGMTString()",d.toGMTString())
//     return d.toGMTString()    
// }

const  handleUserRouter = (req, res) => {
    const method = req.method 

    //登录
    // if (method === "GET" && req.path === "/api/user/login") {
    if (method === "POST" && req.path === "/api/user/login") {
       const {username, password } = req.body
    //    const {username, password } = req.query
       const result = login(username, password)
       return result.then(data =>{
            if (data.username) {
                //操作 cookie  httpOnly 限制
                // res.setHeader('Set-cookie',`username=${data.username};path=/;httpOnly; expires=${getCookieExpires()}`)

                // 设置 session
                req.session.username = data.username
                req.session.realname = data.realname
                // 同步到 redis
                set(req.sessionId, req.session)
                return new SuccessModel()
            }
            return new ErrorModel("登录失败")
       })     
    }
    // //登录验证测试
    if (method === "GET" && req.path === '/api/user/login-test') {
        // if (req.cookie.username) {
        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    session:req.session
                })
            )
        }
        return Promise.resolve(
            new ErrorModel("尚未登录")
        )
    }


}

module.exports = handleUserRouter