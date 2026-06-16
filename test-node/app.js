const express = require('express');
const square = require('./square')
require('./samples')
const app = express();
const port = 3000;
app.set('view engine', 'pug');

app.get('/app', (req, res) => {
  res.send('Hello World!' + square.area() + ": " + square.perimeter());
});

app.get('/template', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

