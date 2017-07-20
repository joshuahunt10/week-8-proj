// TODO: see snips for specific language, see a list of snips for a specific tag, create the API, do tests

const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.set('layout', 'layout')
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');

var store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/codesnipDB',
  collection: 'mySessions'
});
store.on('error', function(error){
  assert.ifError(error);
  assert.ok(false);
});

app.use(require('express-session')({
  secret: "This is the final backend",
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config")[nodeEnv]
console.log("We are using config.mongoUrl", config.mongoUrl)
mongoose.connect(config.mongoUrl)

const indexRoutes = require('./routes/indexRoutes')
const userRoutes = require('./routes/userRoutes')
const snipsRoutes = require('./routes/snipsRoutes')

app.use(indexRoutes);
app.use(userRoutes);
app.use(function(req, res, next){
  if(req.session.user){
    next()
  }else{
    res.redirect('/login')
  }
});
app.use(snipsRoutes);

app.listen(3000, function(){
  console.log('I am over this and want to move on...');
})
