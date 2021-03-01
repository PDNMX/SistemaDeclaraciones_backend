import { ApoyoSchema } from './apoyo';
import { Schema } from 'mongoose';


export const ApoyosSchema = new Schema({
  ninguno: Boolean,
  apoyo: [ApoyoSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  }
});
