import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


const string_type = {
  type: String,
  trim: true,
};

export const ActividadIndustrialSchema = new Schema({
  remuneracion: MontoSchema,
  nombreRazonSocial: string_type,
  tipoNegocio: string_type
});
