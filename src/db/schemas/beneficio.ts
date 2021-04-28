import { FormaRecepcion, TipoOperacion, TipoPersona } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { TerceroSchema } from './tercero';
import { addNullValue } from '../../library/utils';


export const BeneficioSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: addNullValue(TipoOperacion),
  },
  tipoPersona: {
    type: String,
    enum: addNullValue(TipoPersona),
  },
  tipoBeneficio: CatalogoSchema,
  beneficiario: [CatalogoSchema],
  otorgante: TerceroSchema,
  formaRecepcion: {
    type: String,
    enum: addNullValue(FormaRecepcion),
  },
  especifiqueBeneficio: {
    type: String,
    trim: true,
    uppercase: true,
  },
  montoMensualAproximado: MontoSchema,
  sector: CatalogoSchema,
});
