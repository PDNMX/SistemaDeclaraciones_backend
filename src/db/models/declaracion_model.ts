import { DeclaracionDocument } from '../../types';
import { DeclaracionSchema } from '../schemas';
import mongoose from 'mongoose';

const DeclaracionModel = mongoose.model<DeclaracionDocument>('Declaracion', DeclaracionSchema);

export default DeclaracionModel;
