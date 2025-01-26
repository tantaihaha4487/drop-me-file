const express = require('express');
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '../uploads');
const router = express.Router();

router.get('/', (req, res) => {
  const files = fs.readdirSync(uploadPath);
  res.render('display.ejs', { files: files });
});

module.exports = router;