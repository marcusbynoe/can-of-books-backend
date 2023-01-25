'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// *** BRING IN MONGOOSE ****
const mongoose = require('mongoose');
const Book = require('./models/Book');

// **** PER MONGOOSE DOCS ******
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


// ***************************
const app = express();

// **** MIDDLEWARE ****
app.use(cors());

// DON'T FORGET TO USE THIS!!! - MIDDLEWARE TO PARSE JSON DATA FROM THE REQUEST.BODY - USE BEFORE ENDPOINTS
app.use(express.json());



// define PORT validate env is working
const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received');

});


// ****** ENDPOINT TO GET ALL THE BOOKS FROM THE DATABASE *****
app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let allBooks = await Book.find({});

    response.status(200).send(allBooks);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// ***** ENDPOINT TO DELETE A BOOK *****
// we must have a path parameter
// we will use a variable to capture the ID
// to create the variable we use the ':' and add a variable name

app.delete('/books/:bookID', deleteBooks);

async function deleteBooks(request, response, next) {
  try {

    let id = request.params.bookID;

    await Book.findByIdAndDelete(id);

    response.status(200).send('Book Deleted');
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// ****** ENDPOINT TO ADD A BOOK ******

app.post('/books', postBook);

async function postBook(request, response, next) {
  try {

    let createdBook = await Book.create(request.body);

    response.status(200).send(createdBook);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// ***** ENDPOINT TO UPDATE/PUT A BOOK ******
app.put('/books/:bookID', updateBook);

async function updateBook(request, response, next) {
  try {
    let id = request.params.bookID;
    let data = request.body;

    const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true });

    response.status(200).send(updatedBook);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on ${PORT}`));
