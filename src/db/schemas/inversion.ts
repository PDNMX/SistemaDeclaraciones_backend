import { CatalogoSchema } from './catalogo';
import { LocalizacionInversionSchema } from './localizacion_inversion';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { TerceroSchema } from './tercero';


export const InversionSchema = new Schema({
  tipoInversion: CatalogoSchema,
  subTipoInversion: CatalogoSchema,
  titular: [CatalogoSchema],
  tercero: [TerceroSchema],
  numeroCuentaContrato: {
    type: String,
    trim: true,
  },
  localizacionInversion: LocalizacionInversionSchema,
  saldoSituacionActual: MontoSchema,
});
