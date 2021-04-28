import { CatalogoSchema } from './catalogo';
import { Schema } from 'mongoose';
import { TipoPersona } from '../../types/enums';
import { addNullValue } from '../../library/utils';


export const TransmisorSchema = new Schema({
  tipoPersona: {
    type: String,
    enum: addNullValue(TipoPersona),
  },
  nombreRazonSocial: {
    type: String,
    trim: true,
    uppercase: true,
  },
  rfc: {
    type: String,
    trim: true,
    uppercase: true,
  },
  relacion: CatalogoSchema
});
