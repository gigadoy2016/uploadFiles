const express = require('express');
const {Debug} = require("../class/Debug");
const path = require('path') // เรียกใช้งาน path module
const router = express.Router();

const debug = new Debug(true,"UploadMultiply");
// ถอยกลับมาหนึ่งระดับจาก __dirname
const parentDir = path.dirname(__dirname);


debug.debugLog("+++++++++++++++++++++++++++++++++++++++");
router.get('/',function(req,res){
    debug.debugLog("router multiFiles");
    res.sendFile(parentDir + '/views/sample_01.html');
});

module.exports = router;