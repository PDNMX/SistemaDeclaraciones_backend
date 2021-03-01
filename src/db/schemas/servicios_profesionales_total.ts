import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { ServiciosProfesionalesSchema } from './servicios_profesionales';


export const ServiciosProfesionalesTotalSchema = new Schema({
  remuneracionTotal: MontoSchema,
  servicios: [ServiciosProfesionalesSchema],
});
