const express = require('express');
const { multerMiddleware } = require('../middlewares');
const { BookModel } = require('../models');
const router = express.Router();

const stor = { library: [] };

[1, 2, 3].map((el, idx) => {
  const newBook = new BookModel(
    `title ${idx}`,
    `description ${idx}`,
    `authors ${idx}`
  );
  stor.library.push(newBook);
});

router.get('/', (req, res) => {
  const { library } = stor;
  return res.json(library);
});

router.get('/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = stor.library.find(({ id }) => id === bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.status(200).json(book);
});

router.post('/', (req, res) => {
  const newBook = new BookModel(
    req.body.title,
    req.body.description,
    req.body.authors,
    req.body.favorite,
    req.body.fileCover,
    req.body.fileName
  );
  stor.library.push(newBook);
  return res.status(201).json(newBook);
});

router.post('/login', (req, res) => {
  res.status(201).json({ id: 1, email: 'test@mail.ru' });
});

router.put('/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = stor.library.find(({ id }) => id === bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  const { authors, title, description, favorite, fileCover, fileName } =
    req.body;
  book.authors = Array.isArray(authors)
    ? authors.map(
        (author) => new AuthorModel(author.firstName, author.secondName)
      )
    : [];
  book.title = title;
  book.description = description;
  book.favorite = favorite;
  book.fileCover = fileCover;
  book.fileName = fileName;
  return res.status(201).json(book);
});

router.delete('/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = stor.library.find(({ id }) => id === bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  stor.library = stor.library.filter(({ id }) => id !== bookId);
  return res.json('ok');
});

router.post('/upload', multerMiddleware.single('img'), (req, res) => {
  console.log('req.file', req.file);
  console.log('req.body', req.body);
  const newBook = new BookModel(
    req.body.title,
    req.body.description,
    req.body.authors,
    req.body.favorite,
    req.body.fileCover,
    req.body.fileName,
    req.file.path
  );
  stor.library.push(newBook);
  return res.status(201).json(newBook);
});

router.get('/:bookId/download', (req, res) => {
  const { bookId } = req.params;
  const book = stor.library.find(({ id }) => id === bookId);
  if (!book || !book.fileBook) {
    return res.status(404).json('Not found');
  }
  return res.download(
    __dirname + `/../../${book.fileBook}`,
    `${book.fileName}`,
    (err) => {
      if (err) {
        res.status(404).json();
      }
    }
  );
});

module.exports = router;
