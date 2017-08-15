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
  snip.snippet = req.body.snippet
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
    let uncodeSnip = snip.snippet
    res.render('snipShow', {
      title: 'Display Snip',
      snip: snip,
      uncodeSnip: uncodeSnip
    })
  })
})

function search(searchCriteria, searchText){
  if(searchCriteria === 'tag'){
    console.log('in the if')
    return Snip.find({'tags': searchText})
  }else{
    console.log('in the else')

    const searchObject = {}
    searchObject[searchCriteria] = searchText
    searchObject[searchCriteria] = searchText
    console.log(searchObject);
    return Snip.find(searchObject)
  }
}


router.post('/snipsearch', function(req, res){
  const searchCriteria = req.body.searchCriteria

  search(searchCriteria, req.body.search).then(function(snip){
    console.log(snip);
    let uncodeSnip = snip.snippet
    res.render('snipShowSearch', {
      title: 'Display Snip',
      snip: snip,
      uncodeSnip: uncodeSnip
    })
  })
})

module.exports = router;
