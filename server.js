'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();

// middleware
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received');

});

app.get('/books', getBooks);

app.delete('/books/:bookID', deleteBooks);

app.post('/books', postBooks);

app.put('/books/:bookID', updateBooks);

async function updateBooks(request, response, next) {
  try {
    let id = request.params.bookID;
    let data = request.body;
    let options = {new: true, overwrite: true};


    const updateBooks = await Book.findByIdAndUpdate(id, data, options);

    response.status(200).send(updateBooks);
  } catch (error) {
    next(error);
  }

}

async function postBooks(request, response, next) {
  try {
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBooks(request, response, next) {
  console.log('inside of delete books function...serverside');
  try {
    let id = request.params.bookID;
    console.log(request.params.bookID);
    await Book.findByIdAndDelete(id);

    response.status(200).send('Book Deleted');
  } catch (error) {
    next(error);
  }
}

async function getBooks(request, response, next) {
  try {
    let allBooks = await Book.find({});

    response.status(200).send(allBooks);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.get ('*', (request, response) => {
  response.status(404).send('Not Available');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
