import { Pagination, mongoosePagination } from 'mongoose-paginate-ts';
import { DeclaracionDocument } from '../../types';
import { DeclaracionSchema } from '../schemas';
import mongoose from 'mongoose';

DeclaracionSchema.plugin(mongoosePagination);
const DeclaracionModel = mongoose.model<DeclaracionDocument, Pagination<DeclaracionDocument>>('Declaracion', DeclaracionSchema);

export default DeclaracionModel;
