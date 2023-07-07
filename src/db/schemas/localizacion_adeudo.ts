import { MexicoExtranjero } from '../../types/enums';
import { Schema } from 'mongoose';


export const LocalizacionAdeudoSchema = new Schema({
  localizacion: {
    type: String,
    enum: MexicoExtranjero,
  },
  pais: {
    type: String,
    trim: true,
    uppercase: true,
  },
});
