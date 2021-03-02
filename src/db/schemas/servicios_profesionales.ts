import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


export const ServiciosProfesionalesSchema = new Schema({
  remuneracion: MontoSchema,
  tipoServicio: {
    type: String,
    trim: true,
    uppercase: true,
  }
});
