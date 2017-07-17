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

module.exports = router;
