import { Schema } from 'mongoose';


export const TelefonoSchema = new Schema({
  casa: {
    type: String,
    trim: true,
    uppercase: true,
  },
  celularPersonal: {
    type: String,
    trim: true,
    uppercase: true,
  },
});
