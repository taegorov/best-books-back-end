'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3002;



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


const BookShelf = require('./models/Users.js');

const tim = new BookShelf({
  email: 'tim@tim.com', books: [
    { name: 'The Giving Tree', description: 'Book about a shitty kid', status: 'top 5 worst' },
    { name: 'Hyperion', description: 'Book about some people', status: 'top 5 best' },
    { name: 'Lord of the Rings', description: 'They should have used the eagles for travel', status: 'top 5 plot hole' }
  ]
});
console.log({ tim });
tim.save();

// ===== routes ===== //
app.get('/', proofOfLife);
app.get('/books', getAllBooks)



function proofOfLife(req, res) {
  console.log('we did it');
  res.send('hello world');
}

function getAllBooks(request, response) {
  const name = request.query.email;
  console.log({ name });
  BookShelf.find({ email: name }, (err, books) => {
    if (err) return console.error(err);
    console.log('line 51', books);
    response.send(books.length ? books[0].books : 'No books :(');
  })
}

// keep on bottom
app.listen(PORT, () => console.log(`listening on ${PORT}`));