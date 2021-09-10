/*
 * @Author: your name
 * @Date: 2021-08-27 16:30:26
 * @LastEditTime: 2021-09-08 16:09:08
 * @LastEditors: NEWAIMLAP-227
 * @Description: In User Settings Edit
 * @FilePath: \Invoice-service-node\config\config.js
 */
const OmsApiServer = {
    // host: 'http://10.1.1.73', //TEST
    // host: 'http://47.106.245.115', //Live
    host: 'http://172.28.62.135', //LIVE new
    appKey: '1460972771',
    appSecret: '14609727715294'
};

// DMS SQL Server test
const testDBConnection = {
     user: 'OMS_Conn',
     password: 'asdf1234',
     server: '10.1.1.20',
     database:'DM_2016',
     connectionTimeout: 1200000,//15000
     requestTimeout: 1200000//15000*/
};

// DMS SQL Server Live 
const OmsAdapterDBConnection = {
    user: 'oms_adapter',
    password: '@Sdf.1234',
    server: '10.1.1.53',
    database:'DM_2016',
    // connectionTimeout: 15000,//15000
    // requestTimeout: 15000//15000
    connectionTimeout: 1200000,//15000
    requestTimeout: 1200000//15000*/
};


//OMS  MySQL test
const testOMSConnection = {
    host     : '10.1.1.73',
    user     : 'fluxadmin',
    password : '8888',
    database : 'oms',
    connectTimeout : 50000
};
//OMS MySQl Live
const OmsDBConnection = {
    host     : 'mysql_rds.newaim.com.au',
    user     : 'fluxadmin',
    password : 'flux@2016#newaim',
    database : 'oms',
    connectTimeout : 50000
};

module.exports = {
    testDBConnection:testDBConnection,
    testOMSConnection:testOMSConnection,
    OmsAdapterDBConnection: OmsAdapterDBConnection,
    OmsApiServer: OmsApiServer,
    OmsDBConnection: OmsDBConnection
};



