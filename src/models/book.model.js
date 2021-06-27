const uidGenerator = require('node-unique-id-generator');

module.exports = class Book {
  constructor(
    title = '',
    description = '',
    authors = [],
    favorite = '',
    fileCover = '',
    fileName = '',
    id = uidGenerator.generateUniqueId()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
};
