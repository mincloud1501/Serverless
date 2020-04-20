const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;