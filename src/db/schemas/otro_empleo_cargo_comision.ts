import { AmbitoPublico, NivelOrdenGobierno } from '../../types/enums';
import { DomicilioExtranjeroSchema } from './domicilio_extranjero';
import { DomicilioMexicoSchema } from './domicilio_mexico';
import { Schema } from 'mongoose';
import { TelefonoOficinaSchema } from './telefono_oficina';
import { addNullValue } from '../../library/utils';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const OtroEmpleoCargoComisionSchema = new Schema({
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
});
