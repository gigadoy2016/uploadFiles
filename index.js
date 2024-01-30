var express = require("express");                           //import express ด้วยการใช้ require
var app = express();                                        //set express ไว้เป็นตัวแปร app
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const PORT = 3001;                                          //set ตัวแปร port เท่ากับ 3001

//ใช้ get เพื่อเรียกไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//ใช้ post เพื่อรองรับการ upload
app.post('/upload', upload.single('photo'), (req, res) => {
    res.send(req.file)
})

// ใช้ listen เพื่อระบุว่า website จะทำงานที่ port อะไร เราใช้ให้เรียกตัวแปร port
app.listen(PORT, () => {
    console.log(`Server running at <http://localhost>:${PORT}/`);
})