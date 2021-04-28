import { AmbitoPublico, NivelOrdenGobierno, TipoOperacion } from '../../types/enums';
import { DomicilioExtranjeroSchema } from './domicilio_extranjero';
import { DomicilioMexicoSchema } from './domicilio_mexico';
import { OtroEmpleoCargoComisionSchema } from './otro_empleo_cargo_comision';
import { Schema } from 'mongoose';
import { TelefonoOficinaSchema } from './telefono_oficina';
import { addNullValue } from '../../library/utils';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const DatosEmpleoCargoComisionSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: addNullValue(TipoOperacion),
  },
  nivelOrdenGobierno: {
    type: String,
    enum: addNullValue(NivelOrdenGobierno),
  },
  ambitoPublico: {
    type: String,
    enum: addNullValue(AmbitoPublico),
  },
  nombreEntePublico: string_type,
  areaAdscripcion: string_type,
  empleoCargoComision: string_type,
  contratadoPorHonorarios: Boolean,
  nivelEmpleoCargoComision: string_type,
  funcionPrincipal: string_type,
  fechaTomaPosesion: Date,
  telefonoOficina: TelefonoOficinaSchema,
  domicilioMexico: DomicilioMexicoSchema,
  domicilioExtranjero: DomicilioExtranjeroSchema,
  cuentaConOtroCargoPublico: Boolean,
  otroEmpleoCargoComision: [OtroEmpleoCargoComisionSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
