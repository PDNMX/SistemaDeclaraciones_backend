import { ParticipacionSchema } from './participacion';
import { Schema } from 'mongoose';


export const ParticipacionesSchema = new Schema({
  ninguno: Boolean,
  participacion: [ParticipacionSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
