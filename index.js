var express = require('express')
var app = express()

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var connection = require('./db/db');
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.post('/registration', function (req, res) {
  //console.log(req.body.name, req.body.pass, req.body.email);
  connection.query(`INSERT INTO users SET ?`,{ name: req.body.name, password:  req.body.pass, email:  req.body.email }, function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
    res.json({message: 'Data boli uspesne spracovane ;)', username:  req.body.name })
  });
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
