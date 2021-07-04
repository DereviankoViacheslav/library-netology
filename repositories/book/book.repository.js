const { BookModel } = require('../../models');

const library = [];

[1, 2, 3].map((el, idx) => {
  const newBook = new BookModel(
    `title${idx}`,
    `description${idx}`,
    `authors${idx}`,
    `favorite${idx}`,
    `fileCover${idx}`,
    `fileName${idx}`,
    `public/img/${idx}-ava.jpg`
  );
  library.push(newBook);
});

module.exports = { library };
