var express = require('express');
var app = express();
const fs = require('fs')
var port = process.env.PORT || 8000;

app.post('/create/:name/:age', (req, res) => {
  let id;
  let data = JSON.parse(fs.readFileSync('./storage.json', 'utf8'));
  if(data.people.length > 0) {
    id = data.people[data.people.length-1].id + 1;
  } else {
    id = 1
  }
  let obj = {
    id,
    name: req.params.name,
    age: req.params.age
  }
  res.json(obj)
  data.people.push(obj)
  fs.writeFileSync('./storage.json', JSON.stringify(data));
})

app.get('/:id', (req, res) => {
  let foundObj;
  let data = JSON.parse(fs.readFileSync('./storage.json', 'utf8'))
  for(let i = 0; i < data.people.length; i++) {
    if(data.people[i].id === Number(req.params.id)){
      foundObj = data.people[i]
    }
  }
  if(foundObj){
    res.json(foundObj)
  } else {
    res.sendStatus(400)
  }
})

app.get('/', (req, res) => {
  res.json(JSON.parse(fs.readFileSync('./storage.json', 'utf8')))
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
