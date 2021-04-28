'use strict';
const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true }

})

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  books: [bookSchema]
});



module.exports = mongoose.model('users', userSchema);