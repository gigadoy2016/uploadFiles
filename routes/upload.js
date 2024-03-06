const express = require('express');
const multer  = require('multer');
const { Debug } = require("../class/Debug");
const { Time } = require('../class/Time');
const {  conn } = require('../config/dbConfig');
const path = require('path') // เรียกใช้งาน path module
const router = express.Router();
const now = new Time();

const debug = new Debug(true,"Upload.js");
// ถอยกลับมาหนึ่งระดับจาก __dirname
const parentDir = path.dirname(__dirname);

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './docFiles') // folder ที่เราต้องการเก็บไฟล์
    },
    filename: function (req, file, callback) {
      let fileOriginalName = file.originalname;
      let typeFile = file.originalname;
      let user_id = req.body.user_id;
      let doc_id = req.body.doc_id;

      let newFileName = now.getDate(new Date());
      callback(null, newFileName);

    },
});
const upload = multer({ storage: storage });

router.get('/',function(req,res){
    debug.debugLog("router Upload");
    res.status(200).json({'status':'OK'});
});

router.post('/', upload.array('files', 10), function (req, res, next) {  // '10' คือจำนวนสูงสุดของไฟล์ที่อัปโหลดได้  
  debug.debugLog("--Method POST -> router Upload");  
  res.send('Files uploaded successfully!');
});

module.exports = router;