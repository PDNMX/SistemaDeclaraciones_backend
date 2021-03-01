import { CatalogoSchema } from './catalogo';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { TerceroSchema } from './tercero';
import { TransmisorSchema } from './transmisor';


export const BienMuebleSchema = new Schema({
  titular: [CatalogoSchema],
  tipoBien: CatalogoSchema,
  transmisor: [TransmisorSchema],
  tercero: [TerceroSchema],
  descripcionGeneralBien: {
    type: String,
    trim: true,
  },
  formaAdquisicion: CatalogoSchema,
  formaPago: {
    type: String,
    trim: true,
  },
  valorAdquisicion: MontoSchema,
  fechaAdquisicion: Date,
  motivoBaja: CatalogoSchema,
});
