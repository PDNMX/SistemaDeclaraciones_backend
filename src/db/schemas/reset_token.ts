import { Schema } from 'mongoose';

export const ResetTokenSchema = new Schema({
  salt: {
    type: String,
    require: true,
  },
  exp: {
    type: Number,
    require: true,
  }
});
