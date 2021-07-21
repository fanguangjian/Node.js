const xss = require('xss')
const { exec } = require("../db/mysql")


const  getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author = '${author }'`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += ` order by createtime desc`

    //返回promise
    return exec(sql) 
    
    // 先返回假数据
    // return [
    //     {
    //         id: 1,
    //         title: '标题A',
    //         content:'非那附近的解决掉监控',
    //         createTime:1553087695885,
    //         author:"范广建"
    //     },
    //     {
    //         id: 2,
    //         title: '标题A',
    //         content:'非那附近的解决掉监控',
    //         createTime:1553087739899,
    //         author:"haungshna"
    //     }
    // ]
}
const getDetail  = (id) => {
   const sql = `select * from blogs where id='${id}' `
   return exec(sql).then(rows => { 
       return rows[0]
   })
}
const newBlog = (blogData ={}) => {
    console.log("newBlog Data",blogData);   
    const title = xss(blogData.title) 
    const content = xss(blogData.content) 

    const author = blogData.author 
    const createTime = Date.now()
    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}','${content}','${createTime}','${author}')
    `
    // '${createTime}' 不加''会报错
    return exec(sql).then(insertData => {
        console.log('insertData',insertData);
        return {
            id:insertData.insertId
        }
    })
   
}

const updateBlog = (id, blogData ={} ) => {
    // console.log("updateBlog", id, blogData); 
    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const sql = `
        update blogs set title='${title}',
        content='${content}' where id=${id}
    `
    return exec(sql).then(updateData => {
        console.log("updateData",updateData);
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
     
}
const delBlog = (id, author) => {
    const sql = `
    delete from blogs where id='${id}' and author='${author}'
    `
    return exec(sql).then(delData =>{
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}