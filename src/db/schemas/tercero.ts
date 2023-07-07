import { Schema } from 'mongoose';
import { TipoPersona } from '../../types/enums';


export const TerceroSchema = new Schema({
  tipoPersona: {
    type: String,
    enum: TipoPersona,
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
});
