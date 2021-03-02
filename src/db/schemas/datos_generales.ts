import { CatalogoSchema } from './catalogo';
import { CorreoElectronicoSchema } from './correo_electronico';
import { RFCSchema } from './rfc';
import { Schema } from 'mongoose';
import { TelefonoSchema } from './telefono';

const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const DatosGeneralesSchema = new Schema({
  nombre: string_type,
  primerApellido: string_type,
  segundoApellido: string_type,
  curp: string_type,
  rfc: RFCSchema,
  correoElectronico: CorreoElectronicoSchema,
  telefono: TelefonoSchema,
  situacionPersonalEstadoCivil: CatalogoSchema,
  regimenMatrimonial: CatalogoSchema,
  paisNacimiento: string_type,
  nacionalidad: string_type,
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
