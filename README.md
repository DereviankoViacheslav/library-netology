# library-netology

[Сайт на Heroku](https://library-netology.herokuapp.com/)

## Запустить проект

git clone

cd <path_to_project>

npm install

npm run start:dev

### API

##### Получить все книги

GET http://localhost:3000/api/books

##### Получить книгу по id

GET http://localhost:3000/api/books/{bookId}

##### Создать книгу (данные передавать в body)

POST http://localhost:3000/api/books

##### Редактировать книгу по id (данные передавать в body)

PUT http://localhost:3000/api/books/{bookId}

##### Удалить книгу по id

DELETE http://localhost:3000/api/books/{bookId}

##### Загрузить книгу на сервер

POST http://localhost:3000/api/books/upload

##### Скачать книгу c сервера по id

GET http://localhost:3000/api/books/{bookId}

## Запустить проект в docker-compose

docker-compose up -d --build
