import { FormaPago, ValorConformeA } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { DomicilioExtranjeroSchema } from './domicilio_extranjero';
import { DomicilioMexicoSchema } from './domicilio_mexico';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { SuperficieSchema } from './superficie';
import { TerceroSchema } from './tercero';
import { TransmisorSchema } from './transmisor';


export const BienInmuebleSchema = new Schema({
  tipoInmueble: CatalogoSchema,
  titular: [CatalogoSchema],
  porcentajePropiedad: Number,
  superficieTerreno: SuperficieSchema,
  superficieConstruccion: SuperficieSchema,
  tercero: [TerceroSchema],
  transmisor: [TransmisorSchema],
  formaAdquisicion: CatalogoSchema,
  formaPago: {
    type: String,
    enum: FormaPago,
  },
  valorAdquisicion: MontoSchema,
  fechaAdquisicion: Date,
  datoIdentificacion: {
    type: String,
    trim: true,
  },
  valorConformeA: {
    type: String,
    enum: ValorConformeA,
  },
  domicilioMexico: DomicilioMexicoSchema,
  domicilioExtranjero: DomicilioExtranjeroSchema,
  motivoBaja: CatalogoSchema,
 });
