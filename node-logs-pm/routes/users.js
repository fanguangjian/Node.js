/*
 * @Author: your name
 * @Date: 2021-08-26 12:49:51
 * @LastEditTime: 2021-08-26 15:05:01
 * @LastEditors: NEWAIMLAP-227
 * @Description: In User Settings Edit
 * @FilePath: \Invoice-service-node\routes\users.js
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/test', function(req, res, next) {
  console.log('AAAA');
  res.send('respond with a resource');
});

module.exports = router;
