import express, { Request, Response } from 'express';
import { UsersService } from '../../user/user.service';
import { container } from '../../infrastructure/container';
const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const repo: UsersService = container.get(UsersService);
  const users = await repo.getUsers();
  return res.status(200).json(users);
});

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const repo: UsersService = container.get(UsersService);
  const user = await repo.getUser(userId);
  if (!user) {
    return res.status(404).json('Not found');
  }
  return res.status(200).json(user);
});

router.post('/', async (req: Request, res: Response) => {
  const repo: UsersService = container.get(UsersService);
  const newUser = await repo.createUser(req.body);
  return res.status(201).json(newUser);
});

router.put('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const repo: UsersService = container.get(UsersService);
  const user = await repo.updateUser(userId, req.body);
  if (!user) {
    return res.status(404).json('Not found');
  }
  return res.status(201).json(user);
});

router.delete('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const repo: UsersService = container.get(UsersService);
  const result = await repo.deleteUser(userId);
  if (!result) {
    return res.status(404).json('Not found');
  }
  return res.json('ok');
});

export const userRouter = router;
