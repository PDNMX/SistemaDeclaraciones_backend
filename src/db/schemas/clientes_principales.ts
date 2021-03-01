import { ClienteSchema } from './cliente';
import { Schema } from 'mongoose';


export const ClientesPrincipalesSchema = new Schema({
  ninguno: Boolean,
  cliente: [ClienteSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
