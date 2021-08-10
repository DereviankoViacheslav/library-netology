const express = require('express');
const { multerMiddleware } = require('../../../middlewares');
const { BookModel } = require('../../../models');
const router = express.Router();

router.get('/', async (req, res) => {
  return res.status(200).render('book/index', {
    title: 'Список книг',
    library: await BookModel.find(),
    isAuthorized: req.isAuthorized
  });
});

router.get('/create', (req, res) => {
  return res.status(200).render('book/create', {
    title: '',
    book: {},
    isAuthorized: req.isAuthorized
  });
});

router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  let book = await BookModel.findById(bookId).lean();
  if (!book) {
    return res.status(404).redirect('/404');
  }
  let result = null;
  const counter = result ? result.data.counter : null;
  book = { ...book, counter };
  return res.status(200).render('book/view', {
    title: book.title,
    book,
    isAuthorized: req.isAuthorized
  });
});

router.post(
  '/create',
  multerMiddleware.single('fileBook'),
  async (req, res) => {
    await BookModel.create({
      ...req.body,
      fileBook: req.file?.path
    });
    return res.status(200).redirect('/books');
  }
);

router.get('/update/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await BookModel.findById(bookId).lean();
  if (!book) {
    return res.status(404).redirect('/404');
  }
  return res.status(200).render('book/create', {
    title: `Редактировать книгу: ${book.title}`,
    book,
    isAuthorized: req.isAuthorized
  });
});

router.post(
  '/update/:bookId',
  multerMiddleware.single('fileBook'),
  async (req, res) => {
    const { bookId } = req.params;
    const book = await BookModel.findByIdAndUpdate(
      bookId,
      {
        ...req.body,
        fileBook: req.file?.path
      },
      {
        new: true
      }
    ).lean();
    if (!book) {
      return res.status(404).redirect('/404');
    }
    return res.status(200).redirect('/books');
  }
);

router.post('/delete/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await BookModel.deleteOne({ _id: bookId });
  if (!book) {
    return res.status(404).redirect('/404');
  }
  return res.status(200).redirect('/books');
});

router.get('/download/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await BookModel.findById(bookId).lean();
  if (!book || !book.fileBook) {
    return res.status(404).redirect('/404');
  }
  const arrayFromUrl = book.fileBook.split('.');
  const fileName = `${book.title}.${arrayFromUrl[arrayFromUrl.length - 1]}`;
  return res.download(
    __dirname + `/../../../${book.fileBook}`,
    fileName,
    (err) => {
      if (err) {
        return res.status(404).redirect('/404');
      }
    }
  );
});

module.exports = router;
