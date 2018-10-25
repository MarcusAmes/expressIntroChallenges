var express = require('express');
var app = express();
const fs = require('fs')
const path = require('path')
var port = process.env.PORT || 8000;

app.get('/hello', (req, res) => res.send('Hello!'));

app.post('/create/:name', (req, res) => {
  let names = { id: 1, name: req.params.name }
  res.json(names)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/verify/:age', (req, res) => {
  if(req.params.age > 13) {
    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }
})

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
