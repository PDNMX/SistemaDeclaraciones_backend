import { InmueblePrestamoSchema } from './inmueble_prestamo';
import { Schema } from 'mongoose';
import { VehiculoPrestamoSchema } from './vehiculo_prestamo';


export const TipoBienPrestamoSchema = new Schema({
  inmueble: InmueblePrestamoSchema,
  vehiculo: VehiculoPrestamoSchema,
});
