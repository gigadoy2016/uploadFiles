const express = require('express');
const multer  = require('multer');
const { Debug } = require("../class/Debug");
const { Time } = require('../class/Time');
const {  dbConnection,HOSTIP } = require('../config/dbConfig');
const path = require('path');                                        // เรียกใช้งาน path module
const router = express.Router();

const debug = new Debug(true,"AjaxUpload.js");
const parentDir = path.dirname(__dirname);                          // ถอยกลับมาหนึ่งระดับจาก __dirname
const now = new Time();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './docFiles') // folder ที่เราต้องการเก็บไฟล์
    },
    filename: function (req, file, callback) {
      let fileOriginalName = file.originalname;
      let typeFile = fileOriginalName.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
      let newFileName = now.getDate(new Date())+"."+typeFile[1];
      debug.debugLog(newFileName);
      callback(null, newFileName);
    },
})
const upload = multer({ storage: storage });

router.get('/',function(req,res){
    debug.debugLog("--Method GET -> router ajaxUpload");
    res.sendFile(parentDir + '/views/sample_02.html');
});

router.get('/2',function(req,res){
  debug.debugLog("--Method GET -> router ajaxUpload Ver 2.0");
  res.sendFile(parentDir + '/views/sample_03.html');
});

router.post('/',function(req,res){
    debug.debugLog("--Method POST -> router ajaxUpload");
    res.status(200).send("{'status':'OK'}");
});


router.post('/ajax', upload.array('files', 10), function (req, res, next) {  // '10' คือจำนวนสูงสุดของไฟล์ที่อัปโหลดได้  
  debug.debugLog("--Method POST -> router ajaxUpload");
  
  res.status(200).json({'status':'Upload OK'});
});

router.post('/a', upload.single("file"),async function (req, res, next) { 
  debug.debugLog("--Method Ajax POST -> router Upload Ver 2.0");
  console.log('User ID:', req.body.user_id);
  console.log('Document ID:', req.body.doc_id);
  console.log('File:', req.file.originalname);

  const user_id = req.body.user_id;
  const doc_id = req.body.doc_id;
  const fileOriginalName = req.file.originalname;
  const newFileName = renameFile(fileOriginalName);

  const SQL = "INSERT INTO announce_files(user_id, announce_id, status, file_name_old, file_new_name, create_date) VALUES ( '"+user_id+"','"+doc_id+"','1','"+fileOriginalName+"','"+newFileName+"', NOW() );";

  try{
    data =await dbConnection.query(SQL);
    debug.debugLog("Record file data to DB");
  }catch(err){
    debug.debugLog(SQL);
    console.log(err);
  }
  res.status(200).json({'status':'Upload OK'});
});

function renameFile(name){
  const typeFile = name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
  const newName = now.getDate(new Date())+"."+typeFile[1];
  return  newName;
}

module.exports = router;