import { LugarResidencia, RelacionConDeclarante } from '../../types/enums';
import { ActividadLaboralSectorPrivadoSchema } from './actividad_laboral_sector_privado';
import { ActividadLaboralSectorPublicoSchema } from './actividad_laboral_sector_publico';
import { CatalogoSchema } from './catalogo';
import { DomicilioExtranjeroSchema } from './domicilio_extranjero';
import { DomicilioMexicoSchema } from './domicilio_mexico';
import { Schema } from 'mongoose';
import { addNullValue } from '../../library/utils';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const DatosParejaSchema = new Schema({
  ninguno: Boolean,
  nombre: string_type,
  primerApellido: string_type,
  segundoApellido: string_type,
  fechaNacimiento: Date,
  rfc: string_type,
  relacionConDeclarante: {
    type: String,
    enum: addNullValue(RelacionConDeclarante),
  },
  ciudadanoExtranjero: Boolean,
  curp: string_type,
  esDependienteEconomico: Boolean,
  habitaDomicilioDeclarante: Boolean,
  lugarDondeReside: {
    type: String,
    enum: addNullValue(LugarResidencia),
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
