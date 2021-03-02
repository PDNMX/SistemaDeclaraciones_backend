import { Pagination, mongoosePagination } from 'mongoose-paginate-ts';
import { UserDocument } from '../../types';
import { UserSchema } from '../schemas';
import mongoose from 'mongoose';

UserSchema.plugin(mongoosePagination);
const UserModel = mongoose.model<UserDocument, Pagination<UserDocument>>('User', UserSchema);

export default UserModel;
