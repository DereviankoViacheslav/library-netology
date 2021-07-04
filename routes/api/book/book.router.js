const express = require('express');
const { multerMiddleware } = require('../../../middlewares');
const { BookModel } = require('../../../models');
const { library } = require('../../../repositories');
const router = express.Router();

router.get('/', (req, res) => {
  return res.json(library);
});

router.get('/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = library.find(({ id }) => id === bookId);
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
  library.push(newBook);
  return res.status(201).json(newBook);
});

router.post('/login', (req, res) => {
  res.status(201).json({ id: 1, email: 'test@mail.ru' });
});

router.put('/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = library.find(({ id }) => id === bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  const { authors, title, description, favorite, fileCover, fileName } =
    req.body;
  book.authors = authors;
  book.title = title;
  book.description = description;
  book.favorite = favorite;
  book.fileCover = fileCover;
  book.fileName = fileName;
  return res.status(201).json(book);
});

router.delete('/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = library.find(({ id }) => id === bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  library = library.filter(({ id }) => id !== bookId);
  return res.json('ok');
});

router.post('/upload', multerMiddleware.single('fileBook'), (req, res) => {
  const newBook = new BookModel(
    req.body.title,
    req.body.description,
    req.body.authors,
    req.body.favorite,
    req.body.fileCover,
    req.body.fileName,
    req.file.path
  );
  library.push(newBook);
  return res.status(201).json(newBook);
});

router.get('/:bookId/download', (req, res) => {
  const { bookId } = req.params;
  const book = library.find(({ id }) => id === bookId);
  if (!book || !book.fileBook) {
    return res.status(404).json('Not found');
  }
  return res.download(
    __dirname + `../../../../${book.fileBook}`,
    `${book.fileName}`,
    (err) => {
      if (err) {
        res.status(404).json();
      }
    }
  );
});

module.exports = router;
