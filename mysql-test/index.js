const mysql = require('mysql')

//创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: 'fan1225177',
    password: '123456',
    port:'3306',
    database:'myblog'
})

//开始连接
con.connect()

//执行Sql 语句
const sql = "select * from users";
// const sql = "insert into users (username,`password`,realname) values('李四','123','李四')";

con.query(sql, (err, result) => {
    if (err) {
        // console.log(err);
        console.error(err);
        return   
    }
    console.log(result);   
})

// 关闭连接
con.end()