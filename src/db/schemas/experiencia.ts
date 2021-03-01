import { AmbitoPublico, MexicoExtranjero, NivelOrdenGobierno } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { Schema } from 'mongoose';


const string_type = {
  type: String,
  trim: true,
};

export const ExperienciaSchema = new Schema({
  ambitoSector: CatalogoSchema,
  nivelOrdenGobierno: {
    type: String,
    enum: NivelOrdenGobierno
  },
  ambitoPublico: {
    type: String,
    enum: AmbitoPublico,
  },
  nombreEntePublico: string_type,
  areaAdscripcion: string_type,
  empleoCargoComision: string_type,
  funcionPrincipal: string_type,
  fechaIngreso: Date,
  fechaEgreso: Date,
  ubicacion: {
    type: String,
    enum: MexicoExtranjero,
  },
  nombreEmpresaSociedadAsociacion: string_type,
  rfc: string_type,
  area: string_type,
  puesto: string_type,
  sector: CatalogoSchema,
});
