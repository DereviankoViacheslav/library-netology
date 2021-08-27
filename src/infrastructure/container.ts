import { Container, decorate, injectable } from 'inversify';
import { BooksService } from '../book/book.service';
import { UsersService } from '../user/user.service';
import { MongooseBooksService } from './books-mongo-connector/mongoose-book.service';
import { MongooseUsersService } from './user-mongo-connector/mongoose-user.service';
export const container = new Container();

container.bind(BooksService).to(MongooseBooksService).inSingletonScope();
container.bind(UsersService).to(MongooseUsersService).inSingletonScope();
