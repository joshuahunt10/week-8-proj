// TODO: figure out how to use connect-mongodb-session, that stores session in mongodb.
// TODO: figure out how to use password-hash

const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.set('layout', 'layout')
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config")[nodeEnv]
console.log("We are using config.mongoUrl", config.mongoUrl)
mongoose.connect(config.mongoUrl)

const indexRoutes = require('./routes/indexRoutes')

app.use(indexRoutes);

app.listen(3000, function(){
  console.log('I am over this and want to move on...');
})
