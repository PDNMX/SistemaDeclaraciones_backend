import { Schema } from 'mongoose';
import { TipoPersona } from '../../types/enums';
import { addNullValue } from '../../library/utils';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const DuenoTitularPrestamoSchema = new Schema({
  tipoDuenoTitular: {
    type: String,
    enum: addNullValue(TipoPersona),
  },
  nombreTitular: string_type,
  rfc: string_type,
  relacionConTitular: string_type
});
