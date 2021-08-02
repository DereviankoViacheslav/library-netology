const express = require('express');
const { booksRouter } = require('./book');
const { mainRouter } = require('./main');
const { errorRouter } = require('./error');
const { userRouter } = require('./user');

const router = express.Router();

router.use('/', mainRouter);
router.use('/', errorRouter);
router.use('/books', booksRouter);
router.use('/user', userRouter);

module.exports = { views: router };
