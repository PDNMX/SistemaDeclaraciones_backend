import { Schema } from 'mongoose';

export const InstitucionEducativaSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    uppercase: true,
  },
  ubicacion: {
    type: String,
    trim: true,
  },
});
