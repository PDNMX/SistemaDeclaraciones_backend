import { Pagination, mongoosePagination } from 'mongoose-paginate-ts';
import { UserDec } from '../../types';
import { UserDecSchema } from '../schemas';
import mongoose from 'mongoose';

UserDecSchema.plugin(mongoosePagination);
const UserDecModel = mongoose.model<UserDec, Pagination<UserDec>>('UserDec', UserDecSchema);

export default UserDecModel;
