const express = require('express')
const router = express.Router();


router.get('/', function(req, res){
  console.log(req.session);
  res.render('index', {
    title: "connected!",
    user: req.session.user
  })
})

module.exports = router;
