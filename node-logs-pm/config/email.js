/*
 * @Author: your name
 * @Date: 2021-09-06 09:18:56
 * @LastEditTime: 2021-09-06 14:35:10
 * @LastEditors: NEWAIMLAP-227
 * @Description: In User Settings Edit
 * @FilePath: \Invoice-service-node\config\email.js
 */
const moment = require('moment');
let dateString = getBeforeDate(1); // one day before
let sinceDate = moment(dateString.toString()).format('MMMM DD, YYYY');

function getBeforeDate(n){
    var date = new Date() ;
    var year,month,day ;
    date.setDate(date.getDate()-n);
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate() ;
    s = year + '-'+ ( month < 10 ? ( '0' + month ) : month ) + '-' + ( day < 10 ? ( '0' + day ) : day) ;
    return s ;
} 


const eparcelEmail = {
    imapEmailAccount:{
        user: 'grant.fan@newaim.com.au',
        password: 'fan1225133',
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: {
          rejectUnauthorized: false
        }
    },
    fromEmail:'fanguangjianauto@gmail.com',
    sinceDate: sinceDate
}

module.exports = {
    eparcelEmail:eparcelEmail,
  
};
