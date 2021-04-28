import { MexicoExtranjero } from '../../types/enums';
import { Schema } from 'mongoose';
import { addNullValue } from '../../library/utils';


export const LocalizacionAdeudoSchema = new Schema({
  localizacion: {
    type: String,
    enum: addNullValue(MexicoExtranjero),
  },
  pais: {
    type: String,
    trim: true,
    uppercase: true,
  },
});
