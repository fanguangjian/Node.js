var express = require('express');
var router = express.Router();
const {login} = require('../controller/user')
const { SuccessModel, ErrorModel} = require('../model/resModel')

router.post('/login', function(req, res, next) {
    // const {username, password} = req.body
    // res.json({
    //     errno:0,
    //     data:{
    //         username,
    //         password
    //     }
    // })
    //    const {username, password } = req.query
       const {username, password } = req.body     
       const result = login(username, password)
       return result.then(data =>{
        //    console.log(data);
           
            if (data.username) {
                //操作 cookie  httpOnly 限制
                // res.setHeader('Set-cookie',`username=${data.username};path=/;httpOnly; expires=${getCookieExpires()}`)

                // 设置 session
                req.session.username = data.username
                req.session.realname = data.realname
               
                // return new SuccessModel()
                res.json(
                    new SuccessModel()
                )
                return
            }
            // return new ErrorModel("登录失败")
            res.json(
                new ErrorModel('登录失败!!!')
            )
       })     
});

router.get('/login-test',(req,res,next) => {
    if (req.session.username) {
        res.json({
            errno:0,
            msg:'已登录'
        })
        return
    }
    res.json({
        errno:-1,
        msg:'未登录'
    })
})

// http://localhost:3000/api/user/session-test
// 浏览次数
// router.get('/session-test', (req,res,next) => {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++
//     res.json({
//         viewNum: session.viewNum
//     })
// })


module.exports = router;
