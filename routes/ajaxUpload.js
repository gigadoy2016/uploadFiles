const express = require('express');
const multer  = require('multer');
const { Debug } = require("../class/Debug");
const { Time } = require('../class/Time');
const path = require('path');                                        // เรียกใช้งาน path module
const router = express.Router();

const debug = new Debug(true,"AjaxUpload.js");
const parentDir = path.dirname(__dirname);                          // ถอยกลับมาหนึ่งระดับจาก __dirname

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './docFiles') // folder ที่เราต้องการเก็บไฟล์
    },
    filename: function (req, file, callback) {
      let fileOriginalName = file.originalname;
      let typeFile = file.originalname;
      let newFileName = now.getDate(new Date());
      callback(null, newFileName);
    },
})
const upload = multer({ storage: storage });

router.get('/',function(req,res){
    debug.debugLog("--Method GET -> router ajaxUpload");
    res.sendFile(parentDir + '/views/sample_02.html');
});

router.post('/',function(req,res){
    debug.debugLog("--Method POST -> router ajaxUpload");
    res.status(200).send("{'status':'OK'}");
});

router.post('/ajax',function(req,res){
    debug.debugLog("--Method POST -> router ajaxUpload");
    res.status(200).json({'status':'OK'});
});

module.exports = router;