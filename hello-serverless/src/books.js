const mongoose = require('mongoose');
const Book = require('./Book');

const connect = () => {
  return mongoose.connect('mongodb+srv://mincloud:mincloud1501@mincloud-ukgxp.mongodb.net/test?retryWrites=true&w=majority');
};

const createResponse = (status, body) => ({
  statusCode: status,
  body: JSON.stringify(body)
});

exports.createBook = (event, ctx, cb) => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  const { title, body } = JSON.parse(event.body);
  connect().then(
    () => {
      const book = new Book({ title, body });
      return book.save();
    }
  ).then(
    story => {
      cb(null, createResponse(200, book));
    }
  ).catch(
    e => cb(e)
  );
};

exports.createBook = (event, ctx, cb) => {
  cb(null, createResponse(200, { message: 'create' }));
};

exports.readBooks = (event, ctx, cb) => {
  cb(null, createResponse(200, { message: 'list' }));
};

exports.readBook = (event, ctx, cb) => {
  cb(null, createResponse(200, { message: 'read' }));
};

exports.updateBook = (event, ctx, cb) => {
  cb(null, createResponse(200, { message: 'update' }));
};

exports.deleteBook = (event, ctx, cb) => {
  cb(null, createResponse(200, { message: 'delete' }));
};