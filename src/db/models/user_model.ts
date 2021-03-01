import { UserDocument } from '../../types';
import { UserSchema } from '../schemas';
import mongoose from 'mongoose';

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
