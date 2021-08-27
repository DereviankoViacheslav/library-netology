import { UserModel } from '../infrastructure/user-mongo-connector/user.model';
import { IUser } from './user';

export abstract class UsersService {
  abstract createUser(user: IUser): Promise<IUser>;

  abstract getUser(userId: string): Promise<IUser>;

  abstract getUsers(): Promise<IUser[]>;

  abstract updateUser(userId: string, data: IUser): Promise<IUser>;

  abstract deleteUser(userId: string): Promise<object | null>;
}
