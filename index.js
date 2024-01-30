const express = require("express");                           //import express ด้วยการใช้ require
const multer  = require('multer');
const app = express();                                        //set express ไว้เป็นตัวแปร app
const PORT = 3001;                                            //set ตัวแปร port เท่ากับ 3001

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './docFiles') // folder ที่เราต้องการเก็บไฟล์
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname) //ให้ใช้ชื่อไฟล์ original เป็นชื่อหลังอัพโหลด
    },
})
const upload = multer({ storage: storage });


//ใช้ get เพื่อเรียกไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/upload', upload.array('files', 10), function (req, res, next) {  // '10' คือจำนวนสูงสุดของไฟล์ที่อัปโหลดได้  
  res.send('Files uploaded successfully!');
});

app.listen(PORT, () => {
    console.log(`Server running at <http://localhost>:${PORT}/`);
});

