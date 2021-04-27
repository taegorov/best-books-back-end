'use strict';
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  books: { books: Array, required: true }
});

const booksSchema = new.mongoose.Schema({
  name: { type: String, required: true },
  description: {type: String, required: true },
  status: {type: String, requied: true }

})



module.exports = mongoose.model('user', userSchema);