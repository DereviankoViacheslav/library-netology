const express = require('express');
const axios = require('axios');
const { multerMiddleware } = require('../../../middlewares');
const { BookModel } = require('../../../models');
const { library } = require('../../../repositories');
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).render('book/index', {
    title: 'Список книг',
    library
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
  let book = library.find(({ id }) => id === bookId);
  if (!book) {
    return res.status(404).redirect('/404');
  }
  try {
    // await axios.post(`http://localhost:5000/counter/${bookId}/incr`);
    await axios.post(
      `${process.env.COUNTER_URL}/counter/${bookId}/incr`
    );
  } catch (error) {
    console.log('error POST ===>>>', error);
  }
  let result = null;
  try {
    result = await axios.get(
      // `http://localhost:5000/counter/${bookId}`
      `${process.env.COUNTER_URL}/counter/${bookId}`
    );
  } catch (error) {
    console.log('error GET ===>>>', error);
  }
  const counter = result ? result.data.counter : null;
  book = { ...book, counter };
  return res.status(200).render('book/view', {
    title: book.title,
    book
  });
});

router.post('/create', multerMiddleware.single('fileBook'), (req, res) => {
  const newBook = new BookModel(
    req.body.title,
    req.body.description,
    req.body.authors,
    req.body.favorite,
    req.body.fileCover,
    req.body.fileName,
    req.file?.path
  );
  library.push(newBook);
  return res.status(200).redirect('/books');
});

router.get('/update/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = library.find(({ id }) => id === bookId);
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
  (req, res) => {
    const { bookId } = req.params;
    const book = library.find(({ id }) => id === bookId);
    if (!book) {
      return res.status(404).redirect('/404');
    }
    const { authors, title, description, favorite, fileCover, fileName } =
      req.body;
    book.authors = authors || book.authors;
    book.title = title || book.title;
    book.description = description || book.description;
    book.favorite = favorite || book.favorite;
    book.fileCover = fileCover || book.fileCover;
    book.fileName = fileName || book.fileName;
    book.fileBook = req.file?.path || book.fileBook;
    return res.status(200).redirect('/books');
  }
);

router.post('/delete/:bookId', (req, res) => {
  const { bookId } = req.params;
  const bookIdx = library.findIndex(({ id }) => id === bookId);
  if (bookIdx === -1) {
    return res.status(404).redirect('/404');
  }
  library.splice(bookIdx, 1);
  return res.status(200).redirect('/books');
});

router.get('/download/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = library.find(({ id }) => id === bookId);
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
