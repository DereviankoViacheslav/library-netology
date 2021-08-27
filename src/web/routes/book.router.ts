import express, { Request, Response } from 'express';
import { BooksService } from '../../book/book.service';
import { container } from '../../infrastructure/container';
const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const repo = container.get(BooksService);
  const books = await repo.getBooks();
  return res.status(200).json(books);
});

router.get('/:bookId', async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const repo: BooksService = container.get(BooksService);
  const book = await repo.getBook(bookId);
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.status(200).json(book);
});

router.post('/', async (req: Request, res: Response) => {
  const repo: BooksService = container.get(BooksService);
  const newBook = await repo.createBook(req.body);
  return res.status(201).json(newBook);
});

router.post('/login', (_req: Request, res: Response) => {
  res.status(201).json({ id: 1, email: 'test@mail.ru' });
});

router.put('/:bookId', async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const repo: BooksService = container.get(BooksService);
  const book = await repo.updateBook(bookId, req.body);
  if (!book) {
    return res.status(404).json('Not found');
  }
  return res.status(201).json(book);
});

router.delete('/:bookId', async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const repo: BooksService = container.get(BooksService);
  const result = await repo.deleteBook(bookId);
  if (!result) {
    return res.status(404).json('Not found');
  }
  return res.json('ok');
});

export const bookRouter = router;
