import { FideicomisoSchema } from './fideicomiso';
import { Schema } from 'mongoose';


export const FideicomisosSchema = new Schema({
  ninguno: Boolean,
  fideicomiso: [FideicomisoSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
