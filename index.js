require('dotenv').config();
const {  Time } = require('./class/Time');
const express = require("express");                           //import express ด้วยการใช้ require
const multer  = require('multer');
const path = require('path')                                  // เรียกใช้งาน path module
const app = express();                                        //set express ไว้เป็นตัวแปร app
const PORT = process.env.PORT;                                //set ตัวแปร port เท่ากับ 3001
const now = new Time();


const multiFilesRouter = require('./routes/uploadMultiFiles');
const ajaxRouter = require('./routes/ajaxUpload');
const uploadRouter = require('./routes/upload');


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));


//ใช้ get เพื่อเรียกไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/ajax', (req, res) => {
  res.sendFile(__dirname + '/views/sample_02.html');
});

app.use('/multiFiles', multiFilesRouter);
app.use('/ajaxUpload', ajaxRouter);
app.use('/upload', uploadRouter);
app.use('/', uploadRouter);


app.listen(PORT, () => {
    console.log("\n***************** New Start Server *****************");
    console.log(`Server running at <http://localhost>:${PORT}/ start`);
});

