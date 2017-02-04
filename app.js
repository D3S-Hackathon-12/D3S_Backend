var express = require('express')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var fs = require('fs')
var app = express();

app.use(bodyParser.urlencoded({
  extended : true
}))

app.listen(3500, function(err){
  if(err){
    console.log('Server Error!')
    throw err
  }
  else {
    console.log("Server Running At 3500 Port!")
  }
})

app.get('/', function(req, res){
  fs.readFile('index.html', 'utf-8', function(err, data){
    res.send(data)
  })
})
