const express = require('express');
const booksRouter = require('./book.router');

const router = express.Router();

router.use('/api/books', booksRouter);

module.exports = { api: router };
