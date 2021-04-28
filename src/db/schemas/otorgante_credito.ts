import { Schema } from 'mongoose';
import { TipoPersona } from '../../types/enums';
import { addNullValue } from '../../library/utils';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const OtorganteCreditoSchema = new Schema({
  tipoPersona: {
    type: String,
    enum: addNullValue(TipoPersona),
  },
  nombreInstitucion: string_type,
  rfc: string_type,
});
