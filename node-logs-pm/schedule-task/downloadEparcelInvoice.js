/*
 * @Author: G.F
 * @Date: 2021-08-26 16:05:06
 * @LastEditTime: 2021-09-06 11:19:44
 * @LastEditors: NEWAIMLAP-227
 * @Description: In User Settings Edit
 * @FilePath: \Invoice-service-node\action\action.js
 */

let Imap = require('imap');
let {Base64Decode}  = require('base64-stream');
let fs = require('fs'); 
const moment = require('moment');
const logger = require('../config/logger');
const emailConfig = require('../config/email')

function openIndex(imap, cb) {
	imap.openBox('INBOX',true,cb) ;
}

function imapConnect(){  
    imap = new Imap(emailConfig.eparcelEmail.imapEmailAccount);
    imap.connect();
    imap.once('ready', function() {
        openIndex(imap,function(err, box){
            //Search Email
            // imap.search(['ALL',['FROM','tony.hu@newaim.com.au'], ['SINCE', 'August 23, 2021']], function(err, results){
            imap.search(['ALL',['FROM',emailConfig.eparcelEmail.fromEmail], ['SINCE',emailConfig.eparcelEmail.sinceDate]], function(err, results){

                console.log(results, 'res---------------------');
                if(err){
                    console.log( err );
                } 
                if(results.length > 0){
                    let f = imap.fetch(results, {bodies: '', struct: true});     
                    f.on('message', function(msg, seqno){
                        //  console.log('Message #%d', seqno);
                         let prefix = '(#' + seqno + ')' ;    
                         msg.once('attributes', function(attrs){
                            //  console.log('date:', attrs.date);
                          
                            let attachments = findAttachmentParts(attrs.struct);
                            let attachmentReceivedDate =  attrs.date;
                            console.log(prefix + 'Has attachments: %d', attachments.length);
                            for (let i = 0, len=attachments.length ; i < len; ++i) {
                                let attachment = attachments[i];       
                                console.log(prefix + 'Fetching attachment: %s', attachment.params.name);
                                let fileAttr = imap.fetch(attrs.uid , {
                                    bodies: [attachment.partID],
                                    struct: true
                                });
                                //build function to process attachment message
                                if( attachment.params.name.split('.')[1] === 'txt'){
                                    fileAttr.on('message', buildAttMessageFunction(attachment, attachmentReceivedDate));
                                }
                            }
                         });
         
                         msg.once('end', function(){
                             console.log(prefix + 'Finished');
                         });
                    });
         
                    f.once('error', function(err){
                        console.log('Fetch error: '+err);
                        logger.getLogger('eparcel').info(err);
    
                    });
         
                    f.once('end', async function(){
                        imap.end();
                        console.log('Done fetching all messages!');
                        // logger.getLogger('eparcel').info('Download finished');
    
                    });

                }
     
               
            });
        });
    });
     
    imap.once('error', function(err){
          console.log(err)   
    });
     
    imap.once('end', function(){
        console.log('Connection ended');      
        // logger.getLogger('toll').info('INfo')
        // logger.getLogger('eparcel').error('INfo')
        logger.getLogger('eparcel').info('Download eparcel invoice finished');

    });
}

function findAttachmentParts(struct, attachments) {
    attachments = attachments ||  [];
    for (let i = 0, len = struct.length, r; i < len; ++i) {
        if (Array.isArray(struct[i])) {
        findAttachmentParts(struct[i], attachments);
        } else {
        if (struct[i].disposition && ['INLINE', 'ATTACHMENT'].indexOf(struct[i].disposition.type) > -1) {
            attachments.push(struct[i]);
        }
        }
    }
    return attachments;
}

function buildAttMessageFunction(attachment, date) {
    let filename = attachment.params.name;
    let encoding = attachment.encoding;
    let fileName = filename.split('.')[0]; 
    // let today = moment().format('YYYY-MM-DD');
    let timeStap = moment().format();
    let timestamp = Date.parse( new Date());

    let receivedDate = moment(date).format('YYYY-MM-DD');
    let filePath = './Manifest_new_Invoice/eparcel/'+fileName + '_' + receivedDate + '_'+ timestamp+'.txt'+'';  
    // let filePath = './Manifest_new_Invoice/eparcel/'+fileName + '_' + receivedDate + '.txt'+'';    

    return function (msg, seqno) {
        let prefix = '(#' + seqno + ') ';
        msg.on('body', function(stream, info) {
            //Create a write stream so that we can stream the attachment to file;
            console.log(prefix + 'Streaming this attachment to file', filename, info);
            let writeStream = fs.createWriteStream(filePath, { flags: 'w' } );   // './file/b.js'
            writeStream.on('finish', function() {
                console.log(prefix + 'Done writing to file %s', filename);
            });

            //stream.pipe(writeStream); this would write base64 data to the file.
            if (encoding === 'BASE64') {
                //the stream is base64 encoded, so here the stream is decode on the fly and piped to the write stream (file)
                stream.pipe(new Base64Decode()).pipe(writeStream);
            } else  {
                //here we have none or some other decoding streamed directly to the file which renders it useless probably
                stream.pipe(writeStream);
            }
        });
        msg.once('end', function() {          
            logger.getLogger('epaecel').info('Downloaded' + filename);

        });
    };
}


class  ScheduleTask {
    static async runTask(){      
        imapConnect()
    }   
}

module.exports = {  ScheduleTask }