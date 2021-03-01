import { DomicilioExtranjeroSchema } from './domicilio_extranjero';
import { DomicilioMexicoSchema } from './domicilio_mexico';
import { Schema } from 'mongoose';


export const DomicilioDeclaranteSchema = new Schema({
  domicilioMexico: DomicilioMexicoSchema,
  domicilioExtranjero: DomicilioExtranjeroSchema,
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  }
});
