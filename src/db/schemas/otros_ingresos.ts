import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


export const OtrosIngresosSchema = new Schema({
  remuneracion: MontoSchema,
  tipoIngreso: {
    type: String,
    trim: true,
  },
});
