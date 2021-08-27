import { Container, decorate, injectable } from 'inversify';
import { BooksRepository } from './models/book/book.model';
export const container = new Container();

decorate(injectable(), BooksRepository);
container.bind(BooksRepository).toSelf();
