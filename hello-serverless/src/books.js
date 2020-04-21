const mongoose = require('mongoose');
const Promise = require('bluebird');

const Book = require('./book');

mongoose.Promise = Promise;
const mongoString  = 'mongodb+srv://mincloud:<password>@mincloud-ukgxp.mongodb.net/test?retryWrites=true&w=majority';

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, { useMongoClient: true }), fn);
}

const connect = () => {
  return mongoose.connect(mongoString);
};

///////////////////////////////////////////////////////////////////////////
const createResponse = (status, body) => ({
  statusCode: status,
  body: JSON.stringify(body)
});

exports.readBooks = (event, ctx, callback) => {
   ctx.callbackWaitsForEmptyEventLoop = false;
   dbConnectAndExecute(mongoString, () => (
    Book
      .find().sort({ _id: -1 }).limit(20).lean().exec()
      .then(book => callback(null, createResponse(200, book)))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
   ));
};

exports.readBook = (event, ctx, callback) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  dbConnectAndExecute(mongoString, () => (
    Book
      .find({ _id: event.pathParameters.id })
      .then(book => callback(null, createResponse(200, book)))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

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