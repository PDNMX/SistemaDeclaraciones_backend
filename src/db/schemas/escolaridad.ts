import { EscolaridadDocumentoObtenido, EscolaridadEstatus, TipoOperacion } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { InstitucionEducativaSchema } from './institucion_educativa';
import { Schema } from 'mongoose';


export const EscolaridadSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: TipoOperacion,
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
    enum: EscolaridadEstatus,
  },
  documentoObtenido: {
    type: String,
    enum: EscolaridadDocumentoObtenido,
  },
  fechaObtencion: Date,
});
