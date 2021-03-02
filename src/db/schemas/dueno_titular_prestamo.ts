import { Schema } from 'mongoose';
import { TipoPersona } from '../../types/enums';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const DuenoTitularPrestamoSchema = new Schema({
  tipoDuenoTitular: {
    type: String,
    enum: TipoPersona,
  },
  nombreTitular: string_type,
  rfc: string_type,
  relacionConTitular: string_type
});
