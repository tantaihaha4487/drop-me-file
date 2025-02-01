const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const filesRoute = require('./routes/display.route');

const PORT = process.env.PORT || 3331;
const uploadPath = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/upload', (req, res) => {
  // If upload path does not exist, create it!
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
  const upload = multer({ storage: storage }).single('file');
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: 'Something went wrong!' });
    res.status(200).json({ message: 'File uploaded successfully.' });
  });
});

app.use('/display', filesRoute);
app.use('/files', express.static(uploadPath));

app.use((req, res, next) => {
  res.status(404).render('error.ejs', { message: "Page Not Found", error: "Sorry, the page you are looking for does not exist."} );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});