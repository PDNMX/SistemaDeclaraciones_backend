import { CatalogoSchema } from './catalogo';
import { Schema } from 'mongoose';

export const UbicacionSchema = new Schema({
  pais: {
    type: String,
    trim: true,
    uppercase: true,
  },
  entidadFederativa: CatalogoSchema,
});
