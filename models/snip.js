const mongoose = require('mongoose')

const snipSchema = new mongoose.Schema({
  snippet: {type: String},
  language: {type: String},
  tags: [String]
})

const Snip = mongoose.model('Snip', snipSchema)

module.exports = Snip;
