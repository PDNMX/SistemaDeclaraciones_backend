import { Schema } from 'mongoose';


export const TelefonoOficinaSchema = new Schema({
  telefono: {
    type: String,
    trim: true,
    uppercase: true,
  },
  extension: {
    type: String,
    trim: true,
    uppercase: true,
  },
});
