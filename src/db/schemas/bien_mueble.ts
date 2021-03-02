import { CatalogoSchema } from './catalogo';
import { FormaPago } from '../../types/enums';
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
    uppercase: true,
  },
  formaAdquisicion: CatalogoSchema,
  formaPago: {
    type: String,
    enum: FormaPago,
  },
  valorAdquisicion: MontoSchema,
  fechaAdquisicion: Date,
  motivoBaja: CatalogoSchema,
});
