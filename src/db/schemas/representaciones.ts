import { RepresentacionSchema } from './representacion';
import { Schema } from 'mongoose';


export const RepresentacionesSchema = new Schema({
  ninguno: Boolean,
  representacion: [RepresentacionSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
