import { CatalogoSchema } from './catalogo';
import { Schema } from 'mongoose';
import { UbicacionSchema } from './ubicacion';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const VehiculoPrestamoSchema = new Schema({
  tipo: CatalogoSchema,
  marca: string_type,
  modelo: string_type,
  anio: Number,
  numeroSerieRegistro: string_type,
  lugarRegistro: UbicacionSchema,
});
