const express = require('express');
const axios = require('axios');
const { multerMiddleware } = require('../../../middlewares');
const { BookModel } = require('../../../models');
const router = express.Router();

router.get('/', async (req, res) => {
  return res.status(200).render('book/index', {
    title: 'Список книг',
    library: await BookModel.find()
  });
});

router.get('/create', (req, res) => {
  return res.status(200).render('book/create', {
    title: '',
    book: {}
  });
});

router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  let book = await BookModel.findById(bookId).lean();
  if (!book) {
    return res.status(404).redirect('/404');
  }
  // try {
  //   await axios.post(`http://localhost:5000/counter/${bookId}/incr`);
  //   // await axios.post(
  //   //   `http://${process.env.COUNTER_URL}:3001/counter/${bookId}/incr`
  //   // );
  // } catch (error) {
  //   console.log('error POST ===>>>', error);
  // }
  let result = null;
  // try {
  //   result = await axios.get(
  //     `http://localhost:5000/counter/${bookId}`
  //     // `http://${process.env.COUNTER_URL}:3001/counter/${bookId}`
  //   );
  // } catch (error) {
  //   console.log('error GET ===>>>', error);
  // }
  const counter = result ? result.data.counter : null;
  book = { ...book, counter };
  return res.status(200).render('book/view', {
    title: book.title,
    book
  });
});

router.post(
  '/create',
  multerMiddleware.single('fileBook'),
  async (req, res) => {
    const newBook = await BookModel.create({
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
    book
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
