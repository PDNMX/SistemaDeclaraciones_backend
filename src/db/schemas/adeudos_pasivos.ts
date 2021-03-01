import { AdeudoSchema } from './adeudo';
import { Schema } from 'mongoose';


export const AdeudosPasivosSchema = new Schema({
  ninguno: Boolean,
  adeudo: [AdeudoSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
