/*
 * @Author: your name
 * @Date: 2021-08-29 23:01:33
 * @LastEditTime: 2021-09-10 17:42:23
 * @LastEditors: NEWAIMLAP-227
 * @Description: In User Settings Edit
 * @FilePath: \Invoice-service-node\config\logger.js
 */

const path = require('path');
var log4js = require('log4js');
log4js.configure({
	appenders:{
        eparcel:{
            type:"dateFile",		
			pattern: "_yyyy-MM-dd.log",
			alwaysIncludePattern: true,		
			absolute: false,				
			category: "dateFileLog",
            encoding:"utf-8",
            maxLogSize: 1024 * 1024 * 1 , //1M
            backups: 10,
            keepFileExt: false, //(default false) - preserve the file extension when rotating log files (file.log becomes file.1.log instead of file.log.1)
            // daysToKeep: 0, //keep it forever
            // flags: 'a',
            compress: false,
            filename: path.join('logs/eparcel', 'eparcelA')         
        },
        eparcelOMS:{
            type:"dateFile",		
			pattern: "_yyyy-MM-dd.log",
			alwaysIncludePattern: true,		
			absolute: false,				
			category: "dateFileLog",
            encoding:"utf-8",
            maxLogSize: 1024 * 1024 * 1 , //1M
            backups: 10,
            keepFileExt: false, 
            compress: false,
            filename: path.join('logs/eparcel', 'eparcelB')         
        },
        toll:{
            type:"dateFile",		
			pattern: "_yyyy-MM-dd.log",
			alwaysIncludePattern: true,		
			absolute: false,				
			category: "dateFileLog",
            encoding:"utf-8",
            maxLogSize: 1024 * 1024 * 1, //1M
            backups: 10,
            keepFileExt: false,
            compress: false,
            filename: path.join('logs/toll', 'toll')        
        },
        out:{
            type: 'console',
            layout: {
                type: "colored"
            }
        }
    },	
	replaceConsole: false,
    // pm2:true,
    categories: { 
        // default: { appenders: ["cheese"], level: "error" }
        default: { appenders: [ 'out' ], level: 'info' },
        // access: { appenders: [ 'access' ], level: 'info' },  
        eparcel: { appenders: ['eparcel'], level: 'DEBUG' },
        eparcelOMS: { appenders: ['eparcelOMS'], level: 'DEBUG' },
        toll:    { appenders: ['toll'], level: 'DEBUG' },     

     }
});
 

function getLogger(type){
    return log4js.getLogger(type || 'default')

}
module.exports = {
    getLogger,
    // eparcel: log4js.getLogger('eparcel'),
    express: log4js.connectLogger(log4js.getLogger('eparcel'), { level: log4js.levels.INFO }),
}
 