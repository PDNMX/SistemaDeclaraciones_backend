import { LugarResidencia, RelacionConDeclarante } from '../../types/enums';
import { ActividadLaboralSectorPrivadoSchema } from './actividad_laboral_sector_privado';
import { ActividadLaboralSectorPublicoSchema } from './actividad_laboral_sector_publico';
import { CatalogoSchema } from './catalogo';
import { DomicilioExtranjeroSchema } from './domicilio_extranjero';
import { DomicilioMexicoSchema } from './domicilio_mexico';
import { Schema } from 'mongoose';


const string_type = {
  type: String,
  trim: true,
};

export const DatosParejaSchema = new Schema({
  ninguno: Boolean,
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  primerApellido: {
    type: String,
    trim: true,
    required: true,
  },
  segundoApellido: string_type,
  fechaNacimiento: Date,
  rfc: string_type,
  relacionConDeclarante: {
    type: String,
    enum: RelacionConDeclarante,
  },
  ciudadanoExtranjero: Boolean,
  curp: string_type,
  esDependienteEconomico: Boolean,
  habitaDomicilioDeclarante: Boolean,
  lugarDondeReside: {
    type: String,
    enum: LugarResidencia
  },
  domicilioMexico: DomicilioMexicoSchema,
  domicilioExtranjero: DomicilioExtranjeroSchema,
  actividadLaboral: CatalogoSchema,
  actividadLaboralSectorPublico: ActividadLaboralSectorPublicoSchema,
  actividadLaboralSectorPrivadoOtro: ActividadLaboralSectorPrivadoSchema,
  aclaracionesObservaciones: string_type,
});
