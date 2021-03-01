import { Schema } from 'mongoose';


export const TelefonoOficinaSchema = new Schema({
  telefono: {
    type: String,
    trim: true,
  },
  extension: {
    type: String,
    trim: true,
  },
});
