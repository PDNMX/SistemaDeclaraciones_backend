import { Schema } from 'mongoose';
import { VehiculoSchema } from './vehiculo';


export const VehiculosSchema = new Schema({
  ninguno: Boolean,
  vehiculo: [VehiculoSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
