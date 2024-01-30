var express = require("express");                           //import express ด้วยการใช้ require
var app = express();                                        //set express ไว้เป็นตัวแปร app
const multer  = require('multer');
const PORT = 3001;                                          //set ตัวแปร port เท่ากับ 3001


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './docFiles') // folder ที่เราต้องการเก็บไฟล์
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname) //ให้ใช้ชื่อไฟล์ original เป็นชื่อหลังอัพโหลด
    },
})
const upload = multer({ storage });


//ใช้ get เพื่อเรียกไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

//ใช้ post เพื่อรองรับการ upload
app.post('/upload', upload.single('photo'), (req, res) => {
    res.send(req.file)
});

app.listen(PORT, () => {
    console.log(`Server running at <http://localhost>:${PORT}/`);
});

