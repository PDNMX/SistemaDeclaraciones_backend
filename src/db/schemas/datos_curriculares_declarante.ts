import { EscolaridadSchema } from './escolaridad';
import { Schema } from 'mongoose';


export const DatosCurricularesDeclaranteSchema = new Schema({
  escolaridad: [EscolaridadSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
