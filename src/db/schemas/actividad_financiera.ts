import { CatalogoSchema } from './catalogo';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


export const ActividadFinancieraSchema = new Schema({
  remuneracion: MontoSchema,
  tipoInstrumento: CatalogoSchema,
});
