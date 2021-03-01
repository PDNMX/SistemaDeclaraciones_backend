import { InversionSchema } from './inversion';
import { Schema } from 'mongoose';


export const InversionesCuentasValoresSchema = new Schema({
  ninguno: Boolean,
  inversion: [InversionSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
