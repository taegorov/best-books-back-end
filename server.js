'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


const Users = require('./models/Users.js');


// ==== define new users ==== //
// const tim = new Users({
//   email: 'tjvicc84@gmail.com', books: [
//     { name: 'The Giving Tree', description: 'Book about a shitty kid', status: 'top 5 worst' },
//     { name: 'Hyperion', description: 'Book about some people', status: 'top 5 best' },
//     { name: 'Lord of the Rings', description: 'They should have used the eagles for travel', status: 'top 5 plot hole' }
//   ]
// });
// console.log({ tim });
// tim.save();


// ===== routes ===== //
app.get('/', proofOfLife);
app.get('/books', getAllBooks);
app.post('/books', postBooks);
app.delete('/books/:index', deleteBooks);


// ==== functions ==== //
function proofOfLife(req, res) {
  console.log('we did it');
  res.send('hello world');
}

async function getAllBooks(request, response) {
  const name = request.query.email;

  console.log({ name });

  await Users.find({ email: name }, (err, users) => {
    if (err) return console.error(err);
    console.log('users', users);
    response.send(users.length ? users[0].books : 'No books :(');
  });
}

async function postBooks(request, response) {
  const { name, description, status } = request.body;
  const email = request.query.email;

  await Users.find({ email }, (err, users) => {
    if (Users.length) {
      const currentUser = users[0];
      console.log(currentUser);
      console.log(name, description, status);
      const currentBooks = currentUser.books;
      const newBook = { name, description, status  };
      currentBooks.push(newBook);
      currentUser.save();
      response.send(currentUser.books)
    } else {
      response.send('no users with that name:(');
    }
  });
}

async function deleteBooks(request, response) {
  const index = request.params.index;
  const name = request.query.email;

  await Users.find({ email: name }, (err, users) => {
    if (Users.length) {
      const currentUser = users[0];
      const currentBooks = currentUser.books;
      currentBooks.splice(index, 1);
      currentUser.save();
      response.send("deleted!")
    } else {
      response.status(400).send('no users with that name:(');
    }
  });

}



// ==== keep on bottom ==== // 
app.listen(PORT, () => console.log(`listening on ${PORT}`));