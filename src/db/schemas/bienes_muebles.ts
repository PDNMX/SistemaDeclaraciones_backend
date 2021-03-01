import { BienMuebleSchema } from './bien_mueble';
import { Schema } from 'mongoose';


export const BienesMueblesSchema = new Schema({
  ninguno: Boolean,
  bienMueble: [BienMuebleSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
