import express from 'express';
import { bookRouter } from './book.router';
import { userRouter } from './user.router';
const router = express.Router();

router.use('/api/books', bookRouter);
router.use('/api/users', userRouter);

export const routes = router;
