import { Schema } from 'mongoose';

export const ResetTokenSchema = new Schema({
  salt: {
    type: String,
    require: true,
  },
  expiration: {
    type: Number,
    require: true,
  }
});
