import { ExperienciaSchema } from './experiencia';
import { Schema } from 'mongoose';


export const ExperienciaLaboralSchema = new Schema({
  ninguno: Boolean,
  experiencia: [ExperienciaSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
