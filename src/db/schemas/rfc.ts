import { Schema } from 'mongoose';


export const RFCSchema = new Schema({
  rfc: {
    type: String,
    trim: true,
    uppercase: true,
    max_length: 10,
    required: true,
  },
  homoClave: {
    type: String,
    trim: true,
    uppercase: true,
    max_length: 3,
  },
});
