const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});