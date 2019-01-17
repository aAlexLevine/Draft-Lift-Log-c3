var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var db = require('../database-mysql');
// var items = require('../database-mongo');


var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())

app.get('/items', function (req, res) {
  console.log('fireeddd')
  db.selectAll()
  .then( (response) => {
      // console.log(response)
      res.send(response)
    })
    .catch((err)=> {
      console.log(err)
    })
  //   function(err, data) {
  //   if(err) {
  //     console.log(err)
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //     console.log(data)
  //   }
  // });
  
});

app.post('/createNewWorkout', (req, res) => {
  //run DB method takes  promise and catch 
  console.log('body--',req.body)
  db.createNewWorkOut(req.body)
    .then(response => {
      console.log('Response from DB, recieved at server createNewWorkOut', response)
      res.send(response)
    })
    .catch(err => console.log('error, server, createNewWorkOut', err))
})

app.get('/getPlans', (req, res) => {
  console.log(req.query)
  db.getPlans(req.query.user)
    .then( response => res.send(response))
    .catch( err => console.log(err))
})

app.get('/getGroups', (req, res) => {
  db.getGroups(req.query.id)
    .then( response => res.send(response))
    .catch ( err => console.log(err))
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

