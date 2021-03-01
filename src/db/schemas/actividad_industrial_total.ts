import { ActividadIndustrialSchema } from './actividad_industrial';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


export const ActividadIndustrialTotalSchema = new Schema({
  remuneracionTotal: MontoSchema,
  actividades: [ActividadIndustrialSchema],
});
