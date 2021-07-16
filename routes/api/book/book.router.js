const express = require('express');
const { multerMiddleware } = require('../../../middlewares');
const { BookModel } = require('../../../models');
const router = express.Router();

router.get('/', async (req, res) => {
  const books = await BookModel.find();
  return res.status(200).json(books);
});

router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await BookModel.findById(bookId).lean();
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.status(200).json(book);
});

router.post('/', async (req, res) => {
  const newBook = await BookModel.create(req.body);
  return res.status(201).json(newBook);
});

router.post('/login', (req, res) => {
  res.status(201).json({ id: 1, email: 'test@mail.ru' });
});

router.put('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await BookModel.findByIdAndUpdate(bookId, req.body, {
    new: true
  }).lean();
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.status(201).json(book);
});

router.delete('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await BookModel.deleteOne({ _id: bookId });
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.json('ok');
});

router.post(
  '/upload',
  multerMiddleware.single('fileBook'),
  async (req, res) => {
    const newBook = await BookModel.create({
      ...req.body,
      fileBook: req.file.path
    });
    return res.status(201).json(newBook);
  }
);

router.get('/:bookId/download', async (req, res) => {
  const { bookId } = req.params;
  const book = await BookModel.findById(bookId).lean();
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
