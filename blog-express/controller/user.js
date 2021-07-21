const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')


const login = (username, password) => {
    // if (username === "zhangsan" && password === "123") {
    //     return true
    // }
    // return false

    username = escape(username)
    // 生成加密密码,目前是明文密码,需要加密
    // password = genPassword(password)
    password = escape(password)
    // console.log(password);
    
    // const sql = `    //语句错误
    //     select username, realname from users where username='${username}' and password='${password}'
    // `
    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `
        
    return exec(sql).then(rows =>{
        console.log(rows);
        
        return rows[0] || {}
    })
}

module.exports = {
   login
}