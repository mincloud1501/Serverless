const mongoose = require('mongoose');
const Book = require('./book');

const connect = () => {
  return mongoose.connect('mongodb+srv://mincloud:<password>@mincloud-ukgxp.mongodb.net/test?retryWrites=true&w=majority');
};

const createResponse = (status, body) => ({
  statusCode: status,
  body: JSON.stringify(body)
});

exports.createBook = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  const { title, body } = JSON.stringify(event.body);
  connect().then(
    () => {
      const book = new Book({ title, body });
      return book.save();
    }
  ).then(
    book => {
      cb(null, createResponse(200, book));
    }
  ).catch(
    e => cb(e)
  );
};

exports.readBooks = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  connect().then(
    () => Book.find().sort({ _id: -1 }).limit(20).lean().exec()
  ).then(
    book => cb(null, createResponse(200, book))
  );
};

exports.readBook = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  connect().then(
    () => Book.findById(event.pathParameters.id).exec()
  ).then(
    book => {
      if (!book) {
        return cb(null, { statusCode: 404 });
      }
      cb(null, createResponse(200, book));
    }
  );
};

exports.updateBook = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  const update = JSON.parse(event.body);
  connect().then(
    () => Book.findOneAndUpdate({ _id: event.pathParameters.id }, update, { new: true }).exec()
  ).then(
    book => {
      if (!book) {
        return cb(null, { statusCode: 404 });
      }
      cb(null, createResponse(200, book));
    }
  );
};

exports.deleteBook = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  connect().then(
    () => Book.remove({ _id: event.pathParameters.id }).exec()
  ).then(
    () => cb(null, createResponse(204, null))
  );
};