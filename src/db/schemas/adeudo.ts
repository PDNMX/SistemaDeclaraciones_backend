import { CatalogoSchema } from './catalogo';
import { LocalizacionAdeudoSchema } from './localizacion_adeudo';
import { MontoSchema } from './monto';
import { OtorganteCreditoSchema } from './otorgante_credito';
import { Schema } from 'mongoose';
import { TerceroSchema } from './tercero';


export const AdeudoSchema = new Schema({
  titular: [CatalogoSchema],
  tipoAdeudo: CatalogoSchema,
  numeroCuentaContrato: {
    type: String,
    trim: true,
  },
  fechaAdquisicion: Date,
  montoOriginal: MontoSchema,
  saldoInsolutoSituacionActual: MontoSchema,
  tercero: [TerceroSchema],
  otorganteCredito: OtorganteCreditoSchema,
  localizacionAdeudo: LocalizacionAdeudoSchema,
});
