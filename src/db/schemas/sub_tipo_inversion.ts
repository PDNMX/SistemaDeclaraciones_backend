import { Schema } from 'mongoose';

//Se crea esta clase
export const SubTipoInversionSchema = new Schema({
  clave: {
    type: String,
    trim: true,
    required: true,
  },
  valor: {
    type: String,
    trim: true,
    required: true,
  },
  tipoInversion: {
    type: String,
    trim: true,
    required: true,
  },
});
