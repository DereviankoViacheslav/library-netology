const express = require('express');
const { multerMiddleware } = require('../../../middlewares');
const { BooksRepository } = require('../../../models/book/book.model');
const { container } = require('../../../container');
const router = express.Router();

router.get('/', async (req, res) => {
  const repo = container.get(BooksRepository);
  const books = await repo.getBooks();
  return res.status(200).json(books);
});

router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const repo = container.get(BooksRepository);
  const book = await repo.getBook(bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.status(200).json(book);
});

router.post('/', async (req, res) => {
  const repo = container.get(BooksRepository);
  const newBook = await repo.createBook(req.body);
  return res.status(201).json(newBook);
});

router.post('/login', (req, res) => {
  res.status(201).json({ id: 1, email: 'test@mail.ru' });
});

router.put('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const repo = container.get(BooksRepository);
  const book = await repo.updateBook(bookId, req.body);
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.status(201).json(book);
});

router.delete('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const repo = container.get(BooksRepository);
  const book = await repo.deleteBook(bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.json('ok');
});

router.post(
  '/upload',
  multerMiddleware.single('fileBook'),
  async (req, res) => {
    const repo = container.get(BooksRepository);
    const newBook = await repo.createBook({
      ...req.body,
      fileBook: req.file.path
    });
    return res.status(201).json(newBook);
  }
);

router.get('/:bookId/download', async (req, res) => {
  const { bookId } = req.params;
  const repo = container.get(BooksRepository);
  const book = await repo.getBook(bookId);
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
