import { BeneficioSchema } from './beneficio';
import { Schema } from 'mongoose';


export const BeneficiosPrivadosSchema = new Schema({
  ninguno: Boolean,
  beneficio: [BeneficioSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
