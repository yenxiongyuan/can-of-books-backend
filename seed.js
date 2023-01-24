'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {
  // **title: {type: String, required: true},
  // **description: {type: String, required: true},
  // **status: {type: Boolean, required: true},
  // **ring, required: true}

  await Book.create({
    title: 'Count of Monte Cristo',
    description: 'A young man, falsely imprisoned by his jealous friend, escapses and uses a hidden treasure to exact his revenge',
    status: true,
  });

  console.log('Monte Cristo was created!');

  await Book.create({
    title: 'Maus',
    description: 'Spiegelman interviews his father about his experiences as a polish jew and holocaust survivor',
    status: true,
  });

  console.log('Maus was created');

  await Book.create({
    title: 'Rich Dad, Poor Dad',
    description: 'Teaches financial literacy to people',
    status: true,
  });

  console.log('Rich Dad was created');

  mongoose.disconnect();
}

seed();
