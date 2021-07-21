const mysql = require("mysql")
const { MYSQL_CONF } = require("../conf/db") 

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()

//统一执行 SQL 函数
function exec(sql) { 
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {           
                // console.error(err);
                reject(err)
                return   
            }
            // console.log(result);  
            resolve(result) 
        })
    }) 
    return promise     
}

module.exports = {
    exec,
    escape: mysql.escape
}