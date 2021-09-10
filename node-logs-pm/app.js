/*
 * @Author: your name
 * @Date: 2021-08-26 12:49:51
 * @LastEditTime: 2021-09-10 16:39:58
 * @LastEditors: NEWAIMLAP-227
 * @Description: In User Settings Edit
 * @FilePath: \Invoice-service-node\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require("fs");
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const schedule = require('node-schedule');
const logger = require('./config/logger');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var FileStreamRotator = require('file-stream-rotator');
const { ScheduleTask } = require('./schedule-task/downloadEparcelInvoice');
const { UpdateEparcelInvoice } = require('./updateCourierFee/updateEparcelInvoice');

require('module-alias/register')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(logger.express);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const eparcelEmailrule = new schedule.RecurrenceRule();
// const rule =  '*/5 * * * *'
// eparcelEmailrule.hour = 17;
// rule.minute = '/1'; //wrong
eparcelEmailrule.second = 00;
const epaecelEmailJob = schedule.scheduleJob( eparcelEmailrule, async function(){
    console.log('Loading eparcel Invoice emails!'+ '-----'+ new Date());
    // ScheduleTask.runTask()
});
// job.cancel();

const eparcelInvoicelrule = new schedule.RecurrenceRule();
// eparcelInvoicelrule.second = 00;
eparcelInvoicelrule.hour = 16;
eparcelInvoicelrule.minute = 41;
const epaecelUpdateInvoiceJob = schedule.scheduleJob(eparcelInvoicelrule, async function(){
    console.log('Update Eparcel Invoice!'+ '-----'+ new Date());
    UpdateEparcelInvoice.updateEparcelInvoice()
});

module.exports = app;
