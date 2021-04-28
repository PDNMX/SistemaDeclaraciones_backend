import {
  MexicoExtranjero,
  TipoFideicomiso,
  TipoOperacion,
  TipoParticipacionFideicomiso,
  TipoRelacion,
} from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { FiduciarioSchema } from './fiduciario';
import { Schema } from 'mongoose';
import { TerceroSchema } from './tercero';
import { addNullValue } from '../../library/utils';


export const FideicomisoSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: addNullValue(TipoOperacion),
  },
  tipoRelacion: {
    type: String,
    enum: addNullValue(TipoRelacion),
  },
  tipoFideicomiso: {
    type: String,
    enum: addNullValue(TipoFideicomiso),
  },
  tipoParticipacion: {
    type: String,
    enum: addNullValue(TipoParticipacionFideicomiso),
  },
  rfcFideicomiso: {
    type: String,
    trim: true,
    uppercase: true,
  },
  fideicomitente: TerceroSchema,
  fiduciario: FiduciarioSchema,
  fideicomisario: TerceroSchema,
  sector: CatalogoSchema,
  extranjero: {
    type: String,
    enum: addNullValue(MexicoExtranjero),
  },
});
