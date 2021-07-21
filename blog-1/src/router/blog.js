/*
 * @Author: FGJ
 * @LastEditors: Do not edit
 * @Description: 
 * @Date: 2019-03-19 22:46:47
 * @LastEditTime: 2019-03-31 23:40:26
 */

const { getList, getDetail,newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel} = require('../model/resModel')

//统一的登录验证函数
const loginCheck = (req)  => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel("尚未登录")           
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method 
    const id = req.query.id

    //获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {     
        
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''

        if (req.query.isadmin) {
            //管理员界面
            const loginCheckRes = loginCheck(req)
            if (loginCheckRes) {
                //未登录
                return loginCheckRes
            }
            //强制查询自己的博客
            author = req.session.username
        }
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })       
    }

     //获取博客详情
     if (method === "GET" && req.path === "/api/blog/detail") {
        // return {
        //     msg:'这是获取详情'
        // }      
        // const data = getDetail(id)
        // return new SuccessModel(data)

        const result = getDetail(id)
        return result.then( data => {
            return new SuccessModel(data)
        })
        
    }

     //新建一篇博客
     if (method === "POST" && req.path === "/api/blog/new") {
        // const blogData = req.body
        // const data = newBlog(req.body)
        // return new SuccessModel(data)
        // const author = "fan"

        const loginCheckRes = loginCheck(req)
        if (loginCheckRes) {
            //未登录
            return loginCheckRes
        }
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
       
    }
     //更新一篇博客
     if (method === "POST" && req.path === "/api/blog/update") {
        const loginCheckRes = loginCheck(req)
        if (loginCheckRes) {
            //未登录
            return loginCheckRes
        }
        const res = updateBlog(id, req.body)
        return res.then(val => {
            if (val) {
                return new SuccessModel( )            
            }else{
                return new ErrorModel("更新博客失败")
            }
        })
    }
     //删除一篇博客
     if (method === "POST" && req.path === "/api/blog/delete") {
        // const res = delBlog(id)
        const loginCheckRes = loginCheck(req)
        if (loginCheckRes) {
            //未登录
            return loginCheckRes
        }
        const author = req.session.username
        const res = delBlog(id,author)
        return res.then(val =>{
            if (val) {
                return new SuccessModel( )            
            }else{
                return new ErrorModel("删除博客失败")
            }
        })
       
      
    }

}
module.exports = handleBlogRouter