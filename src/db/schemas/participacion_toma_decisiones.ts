import { ParticipacionTDSchema } from './participacion_td';
import { Schema } from 'mongoose';


export const ParticipacionTomaDecisionesSchema = new Schema({
  ninguno: Boolean,
  participacion: [ParticipacionTDSchema],
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
