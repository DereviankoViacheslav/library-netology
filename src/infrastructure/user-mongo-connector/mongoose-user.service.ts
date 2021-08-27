import { injectable } from 'inversify';
import { UserModel } from './user.model';
import { IUser } from '../../user/user';
import { UsersService } from '../../user/user.service';

@injectable()
export class MongooseUsersService extends UsersService {
  async createUser(user: IUser): Promise<IUser> {
    return await UserModel.create(user);
  }

  async getUser(userId: string): Promise<IUser> {
    return await UserModel.findById(userId).lean();
  }

  async getUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async updateUser(userId: string, data: IUser): Promise<IUser> {
    return await UserModel.findByIdAndUpdate(userId, data, {
      new: true
    }).lean();
  }

  async deleteUser(userId: string): Promise<object | null> {
    return await UserModel.deleteOne({ _id: userId });
  }
}
