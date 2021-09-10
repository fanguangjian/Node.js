/*
 * @Author: your name
 * @Date: 2021-08-31 10:07:22
 * @LastEditTime: 2021-08-31 17:10:31
 * @LastEditors: NEWAIMLAP-227
 * @Description: In User Settings Edit
 * @FilePath: \Invoice-service-node\fileLogic\fileMove.js
 */

const fs = require('fs-extra');
const path = require('path');
const logger = require('../config/logger');

async function fileMove(src, dest, courier) {
    // try {
    //   await fs.move(src, dest)
    //   console.log('success!');
    //   logger.getLogger(courier).info('File was moved successfully!');
    // } catch (err) {
    //   console.error(err)
    //   logger.getLogger(courier).error(err);
    // }
    fs.move(src, dest, { overwrite: true }, err => {
      if (err) {
        console.error(err)
        logger.getLogger(courier).error(err);
      }else {
        console.log('success!');
        logger.getLogger(courier).info('File was moved successfully!');
      }    
    })
}


class  FileAction {
    // static async eparcelFileMove(){      
    //     fs.move('/tmp/somedir', '/tmp/may/already/exist/somedir', { overwrite: true }, err => {
    //         if (err) return console.error(err)
    //         console.log('success!')
    //       })
    // }
    
   
    static eparcelFileMove(fileName){
        let src = path.resolve(__dirname, '../Manifest_new_Invoice/eparcel/' + fileName +'');
        let desc = path.resolve(__dirname, '../Processed_Invoice/eparcel/' + fileName +'');
        fileMove(src , desc, 'eparcel')
    }
}

module.exports = {  FileAction }




