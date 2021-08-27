import { injectable } from 'inversify';
import { BookModel } from './book.model';
import { BooksService } from '../../book/book.service';
import { IBook } from '../../book/book';

@injectable()
export class MongooseBooksService extends BooksService {
  async createBook(book: IBook): Promise<IBook> {
    return await BookModel.create(book);
  }

  async getBook(bookId: string): Promise<IBook> {
    return await BookModel.findById(bookId).lean();
  }

  async getBooks(): Promise<IBook[]> {
    return await BookModel.find();
  }

  async updateBook(bookId: string, data: IBook): Promise<IBook> {
    return await BookModel.findByIdAndUpdate(bookId, data, {
      new: true
    }).lean();
  }

  async deleteBook(bookId: string): Promise<object | null> {
    return await BookModel.deleteOne({ _id: bookId });
  }
}
