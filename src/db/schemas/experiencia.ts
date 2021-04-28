import { AmbitoPublico, MexicoExtranjero, NivelOrdenGobierno } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { Schema } from 'mongoose';
import { addNullValue } from '../../library/utils';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const ExperienciaSchema = new Schema({
  ambitoSector: CatalogoSchema,
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
  funcionPrincipal: string_type,
  fechaIngreso: Date,
  fechaEgreso: Date,
  ubicacion: {
    type: String,
    enum: addNullValue(MexicoExtranjero),
  },
  nombreEmpresaSociedadAsociacion: string_type,
  rfc: string_type,
  area: string_type,
  puesto: string_type,
  sector: CatalogoSchema,
});
