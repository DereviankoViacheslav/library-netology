import { Schema, model } from 'mongoose';

export interface Book {
  title: string;
  description?: string;
  authors?: string;
  favorite?: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}

const BookSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  authors: { type: String, default: '' },
  favorite: { type: String, default: '' },
  fileCover: { type: String, default: '' },
  fileName: { type: String, default: '' }
});

export const BookModel = model('Book', BookSchema);

export class BooksRepository {
  async createBook(book: Book) {
    return await BookModel.create(book);
  }

  async getBook(bookId: string) {
    return await BookModel.findById(bookId).lean();
  }

  async getBooks() {
    return await BookModel.find();
  }

  async updateBook(bookId: string, data: Book) {
    return await BookModel.findByIdAndUpdate(bookId, data, {
      new: true
    }).lean();
  }

  async deleteBook(bookId: string) {
    return await BookModel.deleteOne({ _id: bookId });
  }
}
