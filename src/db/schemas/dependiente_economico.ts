import { ActividadLaboralSectorPrivadoSchema } from './actividad_laboral_sector_privado';
import { ActividadLaboralSectorPublicoSchema } from './actividad_laboral_sector_publico';
import { CatalogoSchema } from './catalogo';
import { DomicilioExtranjeroSchema } from './domicilio_extranjero';
import { DomicilioMexicoSchema } from './domicilio_mexico';
import { LugarResidencia } from '../../types/enums';
import { Schema } from 'mongoose';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const DependienteEconomicoSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    uppercase: true,
    required: true,
  },
  primerApellido: {
    type: String,
    trim: true,
    uppercase: true,
    required: true,
  },
  segundoApellido: string_type,
  fechaNacimiento: Date,
  rfc: string_type,
  parentescoRelacion: CatalogoSchema,
  extranjero: Boolean,
  curp: string_type,
  habitaDomicilioDeclarante: Boolean,
  lugarDondeReside: {
    type: String,
    enum: LugarResidencia,
  },
  domicilioMexico: DomicilioMexicoSchema,
  domicilioExtranjero: DomicilioExtranjeroSchema,
  actividadLaboral: CatalogoSchema,
  actividadLaboralSectorPublico: ActividadLaboralSectorPublicoSchema,
  actividadLaboralSectorPrivadoOtro: ActividadLaboralSectorPrivadoSchema,
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
