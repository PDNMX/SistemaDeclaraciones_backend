import { CatalogoSchema } from './catalogo';
import { Schema } from 'mongoose';


const string_type = {
  type: String,
  trim: true,
};

export const DomicilioMexicoSchema = new Schema({
  calle: string_type,
  numeroExterior: string_type,
  numeroInterior: string_type,
  coloniaLocalidad: string_type,
  municipioAlcaldia: CatalogoSchema,
  entidadFederativa: CatalogoSchema,
  codigoPostal: string_type,
});
