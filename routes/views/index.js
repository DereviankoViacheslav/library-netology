const express = require('express');
const { booksRouter } = require('./book');
const { mainRouter } = require('./main');
const { errorRouter } = require('./error');

const router = express.Router();

router.use('/', mainRouter);
router.use('/', errorRouter);
router.use('/books', booksRouter);

module.exports = { views: router };
