import { DuenoTitularPrestamoSchema } from './dueno_titular_prestamo';
import { Schema } from 'mongoose';
import { TipoBienPrestamoSchema } from './tipo_bien_prestamo';


export const PrestamoSchema = new Schema({
  tipoBien: TipoBienPrestamoSchema,
  duenoTitular: DuenoTitularPrestamoSchema,
});
