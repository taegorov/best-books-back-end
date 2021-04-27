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

const tim = new BookShelf({ email: 'tim@tim.com', books: [{ name: 'The Giving Tree', description: 'Book about a shitty kid', status: 'read' }] });
console.log({ tim });
tim.save();


app.get('/', proofOfLife);

function proofOfLife(req, res) {
  console.log('we did it');
  res.send('hello world');
}



// keep on bottom
app.listen(PORT, () => console.log(`listening on ${PORT}`));