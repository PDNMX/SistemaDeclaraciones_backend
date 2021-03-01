import { EnajenacionBienesSchema } from './enajenacion_bienes';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


export const EnajenacionBienesTotalSchema = new Schema({
  remuneracionTotal: MontoSchema,
  bienes: [EnajenacionBienesSchema],
});
