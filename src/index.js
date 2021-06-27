require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const formData = require('express-form-data');

const { BookModel, AuthorModel } = require('./models');

const stor = {
  library: []
};

[1, 2, 3].map((el, idx) => {
  const newAuthor = new AuthorModel(`firstName ${idx}`, `secondName ${idx}`);
  const newBook = new BookModel(`title ${idx}`, `description ${idx}`, [
    newAuthor
  ]);
  stor.library.push(newBook);
});

const app = express();

app.use(express.json());
// app.use(formData.parse());
app.use(cors());

app.get('/api/books', (req, res) => {
  const { library } = stor;
  return res.json(library);
});

app.get('/api/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = stor.library.find(({ id }) => id === bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.status(200).json(book);
});

app.post('/api/books', (req, res) => {
  const authors = Array.isArray(req.body.authors)
    ? req.body.authors.map(
        (author) => new AuthorModel(author.firstName, author.secondName)
      )
    : [];
  const newBook = new BookModel(
    req.body.title,
    req.body.description,
    authors,
    req.body.favorite,
    req.body.fileCover,
    req.body.fileName
  );
  stor.library.push(newBook);
  return res.status(201).json(newBook);
});

app.post('/api/books/login', (req, res) => {
  res.status(201).json({ id: 1, email: 'test@mail.ru' });
});

app.put('/api/books/:bookId', (req, res) => {
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

app.delete('/api/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = stor.library.find(({ id }) => id === bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  stor.library = stor.library.filter(({ id }) => id !== bookId);
  return res.json('ok');
});

app.listen(process.env.HTTP_PORT, () =>
  console.log(`Server is running on ${process.env.HTTP_PORT} port`)
);
