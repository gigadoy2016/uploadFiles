require('dotenv').config();
const {  Time } = require('./class/Time');
const express = require("express");                           //import express ด้วยการใช้ require
const multer  = require('multer');
const path = require('path')                                  // เรียกใช้งาน path module
const app = express();                                        //set express ไว้เป็นตัวแปร app
const PORT = process.env.PORT;                                //set ตัวแปร port เท่ากับ 3001
const now = new Time();


const uploadRouter = require('./routes/uploadMultiFiles');
const ajaxRouter = require('./routes/ajaxUpload');


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './docFiles') // folder ที่เราต้องการเก็บไฟล์
    },
    filename: function (req, file, callback) {
      let fileOriginalName = file.originalname;
      let newFileName = now.getDate(new Date());
      callback(null, newFileName+"_"+file.originalname) //ให้ใช้ชื่อไฟล์ original เป็นชื่อหลังอัพโหลด
    },
})
const upload = multer({ storage: storage });

//ใช้ get เพื่อเรียกไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/upload', upload.array('files', 10), function (req, res, next) {  // '10' คือจำนวนสูงสุดของไฟล์ที่อัปโหลดได้  
  res.send('Files uploaded successfully!');
});


app.use('/multiFiles', uploadRouter);
app.use('/ajaxUpload', ajaxRouter);


app.listen(PORT, () => {
    console.log("\n***************** New Start Server *****************");
    console.log(`Server running at <http://localhost>:${PORT}/ start`);
});

