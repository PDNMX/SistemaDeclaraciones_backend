import { PrestamoSchema } from './prestamo';
import { Schema } from 'mongoose';


export const PrestamoComodatoSchema = new Schema({
  ninguno: Boolean,
  prestamo: [PrestamoSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
