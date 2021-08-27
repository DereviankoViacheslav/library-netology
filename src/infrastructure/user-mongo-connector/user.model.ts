import { Document, Schema, model } from 'mongoose';
import { IUser } from '../../user/user';

var UserSchema = new Schema({
  userName: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  email: { type: String, unique: true, require: true }
});

export const UserModel = model<IUser & Document>('User', UserSchema);
