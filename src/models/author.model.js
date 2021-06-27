const uidGenerator = require('node-unique-id-generator');

module.exports = class Author {
  constructor(
    firstName = '',
    secondName = '',
    id = uidGenerator.generateUniqueId()
  ) {
    this.id = id;
    this.firstName = firstName;
    this.secondName = secondName;
  }
};
