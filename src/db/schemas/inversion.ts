import { CatalogoSchema } from './catalogo';
import { LocalizacionInversionSchema } from './localizacion_inversion';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { TerceroSchema } from './tercero';
import { SubTipoInversionSchema } from './sub_tipo_inversion';


export const InversionSchema = new Schema({
  tipoInversion: CatalogoSchema,
  subTipoInversion: SubTipoInversionSchema, //Se cambia a subtipoinversion
  titular: [CatalogoSchema],
  tercero: [TerceroSchema],
  numeroCuentaContrato: {
    type: String,
    trim: true,
    uppercase: true,
  },
  localizacionInversion: LocalizacionInversionSchema,
  saldoSituacionActual: MontoSchema,
});
