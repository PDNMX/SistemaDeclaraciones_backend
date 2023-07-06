import { MexicoExtranjero } from '../../types/enums';
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
  nivelOrdenGobierno: string_type,  //Se cambia a string_type porque con el enum no acepta nulos y se están enviando nulos
  ambitoPublico:  string_type,
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
