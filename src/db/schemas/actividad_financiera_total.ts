import { ActividadFinancieraSchema } from './actividad_financiera';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


export const ActividadFinancieraTotalSchema = new Schema({
  remuneracionTotal: MontoSchema,
  actividades: [ActividadFinancieraSchema],
});
