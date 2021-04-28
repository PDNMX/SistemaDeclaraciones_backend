import { EscolaridadDocumentoObtenido, EscolaridadEstatus, TipoOperacion } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { InstitucionEducativaSchema } from './institucion_educativa';
import { Schema } from 'mongoose';
import { addNullValue } from '../../library/utils';


export const EscolaridadSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: addNullValue(TipoOperacion),
  },
  nivel: CatalogoSchema,
  institucionEducativa: InstitucionEducativaSchema,
  carreraAreaConocimiento: {
    type: String,
    trim: true,
    uppercase: true,
  },
  estatus: {
    type: String,
    enum: addNullValue(EscolaridadEstatus),
  },
  documentoObtenido: {
    type: String,
    enum: addNullValue(EscolaridadDocumentoObtenido),
  },
  fechaObtencion: Date,
});
