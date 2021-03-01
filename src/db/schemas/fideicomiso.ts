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


export const FideicomisoSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: TipoOperacion,
  },
  tipoRelacion: {
    type: String,
    enum: TipoRelacion,
  },
  tipoFideicomiso: {
    type: String,
    enum: TipoFideicomiso,
  },
  tipoParticipacion: {
    type: String,
    enum: TipoParticipacionFideicomiso,
  },
  rfcFideicomiso: {
    type: String,
    trim: true,
  },
  fideicomitente: TerceroSchema,
  fiduciario: FiduciarioSchema,
  fideicomisario: TerceroSchema,
  sector: CatalogoSchema,
  extranjero: {
    type: String,
    enum: MexicoExtranjero,
  },
});
