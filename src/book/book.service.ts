import { IBook } from './book';

export abstract class BooksService {
  abstract createBook(book: IBook): Promise<IBook>;

  abstract getBook(bookId: string): Promise<IBook>;

  abstract getBooks(): Promise<IBook[]>;

  abstract updateBook(bookId: string, data: IBook): Promise<IBook>;

  abstract deleteBook(bookId: string): Promise<object | null>;
}
