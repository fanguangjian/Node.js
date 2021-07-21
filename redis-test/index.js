// npm install redis --save --registry=https://registry.npm.taobao.org

const redis = require("redis")

//创建客户端
const redisClient = redis.createClient(6379,"127.0.0.1")
redisClient.on("error", err => {
    console.error(err);    
    
})

//测试
redisClient.set("myname", "fanguangjianAA", redis.print) //Reply OK
redisClient.get("myname", (err,val) => {
    if (err) {
        console.error(err);
        return        
    }
    console.log(val); // val fanguangjianAA

    //退出redis
    redisClient.quit()
    
})