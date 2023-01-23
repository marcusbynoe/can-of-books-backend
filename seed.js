'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/Book.js');

async function seed() {

  await Book.create({
    title: 'The Great Gatsby',
    description: 'The novel chronicles an era that Fitzgerald himself dubbed the Jazz Age',
    status: 'Not read'
  });

  console.log('The Great Gatsby was added');


  await Book.create({
    title: 'Hamlet',
    description: 'The Tragedy of Hamlet, Prince of Denmark, or more simply Hamlet, is a tragedy by William Shakespeare.',
    status: 'Not read'
  });

  console.log('Hamlet was created');

  await Book.create({
    title: 'Pride and Prejudice',
    description: 'The book is narrated in free indirect speech following the main character Elizabeth Bennet as she deals with matters of upbringing, marriage, moral rightness and education in her aristocratic society.',
    status: 'Not read'
  });

  console.log('Pride and Prejudice was created');



  mongoose.disconnect();
}

seed();
