import { MontoSchema } from './monto';
import { OtrosIngresosSchema } from './otros_ingresos';
import { Schema } from 'mongoose';


export const OtrosIngresosTotalSchema = new Schema({
  remuneracionTotal: MontoSchema,
  ingresos: [OtrosIngresosSchema],
});
