import { Schema } from 'mongoose';

export const MontoSchema = new Schema({
  valor: Number,
  moneda: {
    type: String,
    trim: true,
  },
});
