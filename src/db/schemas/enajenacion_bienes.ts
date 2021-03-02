import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


export const EnajenacionBienesSchema = new Schema({
  remuneracion: MontoSchema,
  tipoBienEnajenado: {
    type: String,
    trim: true,
    uppercase: true,
  },
});
