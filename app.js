var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var ejs = require('ejs')
var fs = require('fs')
var app = express();
var schema = mongoose.Schema;

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('public'));

mongoose.connect("mongodb://localhost/DS3_Hackathon", function(err){
  if(err){
    console.log("DB Error")
    throw err
  }
})

var UserSchema = new schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  id: {
    type: String
  },
  password: {
    type: String
  }
})

var User = mongoose.model('user',UserSchema)
var server = 3000;

app.listen(server, function(err){
  if(err){
    console.log('Server Error!')
    throw err
  }
  else {
    console.log("Server Running At "+server+" Port!")
  }
})

app.get('/', function(req, res){
  res.redirect('/login')
})

app.get('/login', function(req, res){
  fs.readFile('login.html', 'utf-8', function(err, data){
    res.send(data)
  })
})

app.get('/cctv', function(req, res){
  /*fs.readFile('cctv.html', 'utf-8', function(err, data){
    res.send(data)
  })*/
  console.log('hello')
  res.send('hello')
})

app.get('/chase', function(req, res){
  fs.readfile('chase.html', 'utf-8', function(err, data){
    res.send(data)
  })
})

app.post('/register', function(req,res){
  var user = new User({
    username : req.param('username'),
    id : req.param('id'),
    password : req.param('password')
  })
  User.findOne({
    id : req.param('id')
  }, function(err, result){
    if(err){
      console.log('/register Error!')
      throw err
    }
    else if(result){
      res.json({
        success : false,
        message : "Already Added Account"
      })
    }
    else {
      user.save(function(err){
        if(err){
          console.log('/register save Error!')
          throw err
        }
        else {
          console.log(req.param('username')+'register!')
          res.json({
            success : true,
            message : "user save success"
          })
        }
      })
    }
  })
})

app.post('/login', function(req, res){
  var body = req.body;
  console.log(body)
  User.findOne({
    id: body.id
  }, function(err, result){
    if(err){
      console.log('/login Error!')
      throw err
    }
    if(result){
      if(result.password == body.password){
        res.redirect('/cctv')
      }
      else if(result.password != body.password){
        res.redirect('/')
      }
    }
    else {
      res.redirect('/')
    }
  })
})
