import { DependienteEconomicoSchema } from './dependiente_economico';
import { Schema } from 'mongoose';


export const DatosDependientesEconomicosSchema = new Schema({
  ninguno: Boolean,
  dependienteEconomico: [DependienteEconomicoSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  }
});
