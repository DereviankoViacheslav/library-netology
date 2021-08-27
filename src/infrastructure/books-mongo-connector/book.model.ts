import { Document, Schema, model } from 'mongoose';
import { IBook } from '../../book/book';

const BookSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  authors: { type: String, default: '' },
  favorite: { type: String, default: '' },
  fileCover: { type: String, default: '' },
  fileName: { type: String, default: '' }
});

export const BookModel = model<IBook & Document>('Book', BookSchema);
