import { Schema } from 'mongoose';

const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const LocalizacionInversionSchema = new Schema({
  pais: String,
  institucionRazonSocial: string_type,
  rfc: string_type,
});
