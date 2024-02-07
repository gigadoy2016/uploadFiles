const express = require('express');
const {Debug} = require("../class/Debug");
const path = require('path') // เรียกใช้งาน path module
const router = express.Router();

const debug = new Debug(true,"AjaxUpload.js");
// ถอยกลับมาหนึ่งระดับจาก __dirname
const parentDir = path.dirname(__dirname);

router.get('/',function(req,res){
    debug.debugLog("router ajaxUpload");
    res.status(200).send("{'status':'OK'}");
});

module.exports = router;