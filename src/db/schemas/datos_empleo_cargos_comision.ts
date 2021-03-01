import { AmbitoPublico, NivelOrdenGobierno, TipoOperacion } from '../../types/enums';
import { DomicilioExtranjeroSchema } from './domicilio_extranjero';
import { DomicilioMexicoSchema } from './domicilio_mexico';
import { Schema } from 'mongoose';
import { TelefonoOficinaSchema } from './telefono_oficina';


const string_type = {
  type: String,
  trim: true,
};

export const DatosEmpleoCargoComisionSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: TipoOperacion,
  },
  nivelOrdenGobierno: {
    type: String,
    enum: NivelOrdenGobierno,
  },
  ambitoPublico: {
    type: String,
    enum: AmbitoPublico,
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
  aclaracionesObservaciones: string_type,
});
