/*
 * @Author: your name
 * @Date: 2021-08-27 15:44:21
 * @LastEditTime: 2021-09-10 21:09:10
 * @LastEditors: NEWAIMLAP-227
 * @Description: In User Settings Edit
 * @FilePath: \Invoice-service-node\updateCourierFee\updateEparcelInvoice.js
 */

const logger = require('../config/logger');

function testLog(){
    let a =    { status: 1, data: true, msg: '' }
    for (let i = 0; i < 100; i++) {
        logger.getLogger('toll').info('sync to OMS:--order No: AAAAAAAAAAAAAA test:------'+ JSON.stringify(a));        
    }
}
class UpdateEparcelInvoice {
    static async updateEparcelInvoice() { 
             testLog()
    }
}

module.exports = { UpdateEparcelInvoice }