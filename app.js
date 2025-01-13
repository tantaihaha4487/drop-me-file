const express = require('express');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const app = express();
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.post('/upload', (req, res) => {
  const upload = multer({ storage: storage }).single('file');
  upload(req, res, (err) => {
    if (err) return res.send(err);
    res.send('File uploaded successfully!');
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});