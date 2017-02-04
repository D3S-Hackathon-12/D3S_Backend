var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var ejs = require('ejs')
var fs = require('fs')
var app = express();
var schema = mongoose.Schema;

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(session({
  secret:'@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized:true
}));

app.use(express.static('public'));
app.use(express.static('views'));

mongoose.connect("mongodb://localhost/DS3_Hackathon", function(err){
  if(err){
    console.log("DB Error")
    throw err
  }
})

var UserSchema = new schema({
  username : {
    type: String
  },
  class : {
    type : String
  },
  schnum : {
    type : String
  },
  num : {
    type : String
  },
  id : {
    type: String
  },
  password : {
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
  res.redirect('/secure')
})

app.get('/login', function(req, res){
  req.session.destroy(function(){
    req.session;
  });
  fs.readFile('login.ejs', 'utf-8', function(err, data){
    res.send(data)
  })
})

app.get('/secure', function(req, res){
  req.session.destroy(function(){
    req.session;
  });
  fs.readFile('secure.ejs', 'utf-8', function(err, data){
    res.send(data)
  })
})

app.get('/cctvData', function(req, res){
    User.find({
    }, function(err, result){
      if(err){
        console.log('/cctv Error!')
        throw err
      }
      else{
        res.json(result)
      }
    })
})

app.get('/cctv', function(req,res){
  if(req.session.master==undefined){
    res.redirect('/login')
  }
  else {
    res.render("cctv.ejs")
  }
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
    password : req.param('password'),
    schnum : req.param('schnum'),
    class : req.param('class'),
    num : req.param('num')
  })
  User.findOne({
    schnum : req.param('schnum')
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
  console.log(req.body)
  User.findOne({
    id: req.body.id
  }, function(err, result){
    if(err){
      console.log('/login Error!')
      throw err
    }
    if(result){
      if(result.password == req.body.password){
        req.session.master = req.body.password
        console.log(req.session.master)
        res.redirect('/cctv')
      }
      else if(result.password != req.body.password){
        res.redirect('/')
      }
    }
    else {
      res.redirect('/')
    }
  })
})

app.post('/secure', function(req, res){
  var body = req.body
  console.log(body)
  User.findOne({
    schnum : body.schnum
  }, function(err, result){
    if(err){
      console.log('/secure Error!')
      throw err
    }
    else if(result){
      console.log(result)
      if(result.num*1 == 0){
        req.session.num = 1;
      }
      else if(result.num*1 == 1){
        req.session.num = 0;
      }
      User.update({
        username : result.username,
        class : result.class,
        schnum : result.schnum,
        num : req.session.num,
        id : result.id,
        password : result.password
      }, function(err, result){
        if(err){
          console.log('/secure update Error!')
          throw err
        }
        else {
          console.log(result.username+" 처리완료")
          res.redirect('/secure')
        }
      })
    }
  })
})
