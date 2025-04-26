const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = (uploadPath) => {
  const app = express.Router();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  app.post('/', (req, res) => {
    // If upload path does not exist, create it!
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    const upload = multer({ storage: storage }).single('file');
    upload(req, res, (err) => {
      if (err) return res.status(400).json({ error: 'Something went wrong!' });
      res.status(200).json({ message: 'File uploaded successfully.' });
    });
  });

  return app;
};