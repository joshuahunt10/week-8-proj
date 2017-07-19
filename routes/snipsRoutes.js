const express = require('express')
const router = express.Router();
const User = require('../models/user')
const Snip = require('../models/snip')

router.get('/snipdash', function(req, res){
  res.render('snipDash', {
    user: req.session.user,
    title: "Snip Dashboard"
  })
})

router.post('/snipadd', function(req, res){
  var snip = new Snip()
  snip.title = req.body.title
  snip.snippet = req.body.snippet
  snip.lang = req.body.language
  let tags = req.body.tags
  let arr = tags.split(" ")
  for (var i = 0; i < arr.length; i++) {
    snip.tags.push(arr[i])
  }
  snip.save()
  .then(function(snip){
    User.findOne({'_id': req.session.userID})
    .then(function(user){
      user.snips.push({id: snip._id, lang: snip.lang})
      user.save()
      .then(function(user){
        res.redirect('/snipdash')
      })
    })
  })
})

module.exports = router;
