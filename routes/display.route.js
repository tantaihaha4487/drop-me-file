const express = require('express');
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '../uploads');
const router = express.Router();

router.get('/', (req, res) => {
  const files = fs.readdirSync(uploadPath);
  if (!(files.length > 0)) return res.render('error.ejs', { message: "No Files Found", error: "Sorry, no files found in the uploads directory. Please upload any file first." });
  res.render('display.ejs', { files: files });
});

module.exports = router;