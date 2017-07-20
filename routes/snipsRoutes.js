const express = require('express')
const router = express.Router();
const User = require('../models/user')
const Snip = require('../models/snip')

router.get('/snipdash', function(req, res){
  User.findOne({'_id': req.session.userID})
  .then(function(user){
    console.log(user);
    res.render('snipDash', {
      user: req.session.user,
      title: "Snip Dashboard",
      snips: user.snips
    })
  })
})

router.post('/snipadd', function(req, res){
  var snip = new Snip()
  snip.title = req.body.title
  snip.snippet = encodeURI(req.body.snippet)
  snip.language = req.body.lang
  let tags = req.body.tags
  let arr = tags.split(",")
  for (var i = 0; i < arr.length; i++) {
    snip.tags.push(arr[i])
  }
  snip.save()
  .then(function(snip){
    User.findOne({'_id': req.session.userID})
    .then(function(user){
      user.snips.push({id: snip._id, title: snip.title})
      user.save()
      .then(function(user){
        res.redirect('/snipdash')
      })
    })
  })
})


router.get('/snip/show/:snipID', function(req, res){
  Snip.findOne({'_id': req.params.snipID})
  .then(function(snip){
    console.log(snip);
    let uncodeSnip = decodeURI(snip.snippet)
    res.render('snipShow', {
      title: 'Display Snip',
      snip: snip,
      uncodeSnip: uncodeSnip
    })
  })
})

module.exports = router;
