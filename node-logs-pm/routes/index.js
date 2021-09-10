/*
 * @Author: your name
 * @Date: 2021-08-26 12:49:51
 * @LastEditTime: 2021-08-26 14:11:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Invoice-service-node\routes\index.js
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/aa', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
