import { Schema } from 'mongoose';

const string_type = {
  type: String,
  trim: true
};

export const LocalizacionInversionSchema = new Schema({
  pais: string_type,
  institucionRazonSocial: string_type,
  rfc: string_type,
});
