import { Schema } from 'mongoose';


export const CorreoElectronicoSchema = new Schema({
  institucional: {
    type: String,
    trim: true,
  },
  personal: {
    type: String,
    trim: true,
  },
});
