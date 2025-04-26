const express = require('express');
const path = require('path');
require('dotenv').config();

const indexRoute = require('./routes/index.route');
const filesRoute = require('./routes/display.route');
const uploadPath = path.join(__dirname, 'uploads');
const uploadRoute = require('./routes/upload.route')(uploadPath);

const PORT = process.env.PORT || 3331;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use('/', indexRoute);
app.use('/display', filesRoute);
app.use('/files', express.static(uploadPath));
app.use('/upload', uploadRoute);

app.use((req, res, next) => {
  res.status(404).render('error.ejs', { message: "Page Not Found", error: "Sorry, the page you are looking for does not exist."} );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});