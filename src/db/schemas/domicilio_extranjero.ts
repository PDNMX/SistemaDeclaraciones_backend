import { Schema } from 'mongoose';


const string_type = {
  type: String,
  trim: true,
};

export const DomicilioExtranjeroSchema = new Schema({
  pais: string_type,
  calle: string_type,
  numeroExterior: string_type,
  numeroInterior: string_type,
  ciudadLocalidad: string_type,
  estadoProvincia: string_type,
  codigoPostal: string_type,
});
