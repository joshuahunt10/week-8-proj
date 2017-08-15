const express = require('express')
const router = express.Router();
const User = require('../models/user')
var passwordHash = require('password-hash')

router.get('/login', function(req, res){
  res.render('login')
})

router.get('/register', function(req, res){
  res.render('register')
})

router.post('/register', function(req, res){
  var hashedPassword = passwordHash.generate(req.body.password)
  console.log('req.body.password', req.body.password);
  console.log('hashedPassword', hashedPassword);

  var u = new User()
  u.username = req.body.username
  u.password = hashedPassword
  u.save()
  .then(function(user){
    res.redirect('/')
  })
})


router.post('/auth', function(req, res){
  User.findOne({username: req.body.username})
  .then(function(l){
    if(passwordHash.verify(req.body.password, l.password)){
      console.log('login success');
      req.session.user = l.username
      req.session.userID = l._id
      res.redirect('/snipdash')
    } else{
      res.send('inside the else statement')
    }
  })
})

router.post('/logout', function(req, res){
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
