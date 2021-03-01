import { CatalogoSchema } from './catalogo';
import { DomicilioExtranjeroSchema } from './domicilio_extranjero';
import { DomicilioMexicoSchema } from './domicilio_mexico';
import { Schema } from 'mongoose';


export const InmueblePrestamoSchema = new Schema({
  tipoInmueble: CatalogoSchema,
  domicilioMexico: DomicilioMexicoSchema,
  domicilioExtranjero: DomicilioExtranjeroSchema,
});
