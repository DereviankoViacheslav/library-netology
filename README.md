# library-netology

### запрос для вставки данных о двух книгах в коллекцию books

```
db.books.insertMany([
  {
    title: 'string',
    description: 'string',
    authors: 'string'
  },
  {
    title: 'string',
    description: 'string',
    authors: 'string'
  }
]);
```

### запрос для поиска документов коллекции books по полю title

```
db.books.find({ title: 'value' });
```

### запрос для редактирования полей: description и authors коллекции books по _id записи

```
db.books.updateOne(
  { _id_: 'bookId' },
  {
    $set: {
      description: 'string',
      authors: 'string'
    }
  }
);

```
