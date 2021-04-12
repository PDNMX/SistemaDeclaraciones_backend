import { ResetTokenSchema } from './reset_token';
import { Role } from '../../types/enums';
import { Schema } from 'mongoose';

const options = {
  collection: 'users',
  timestamps: { createdAt: 'createdAt',  updatedAt: 'updatedAt'}
};

export const UserSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    uppercase: true,
  },
	primerApellido: {
    type: String,
    required: true,
    uppercase: true,
  },
	segundoApellido: {
    type: String,
    uppercase: true,
  },
	curp: {
    type: String,
    required: true,
    uppercase: true,
  },
  rfc: {
    type: String,
    required: true,
    uppercase: true,
  },

  // ----- READ ONLY ------
  resetToken: ResetTokenSchema,
  refreshJwtToken: ResetTokenSchema,
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  roles: {
    type: [String],
    enum: Role,
    required: true,
    default: [Role.USER],
  },
  declaraciones: [{
    type: Schema.Types.ObjectId,
    ref: 'Declaracion',
    required: true,
    index: true,
  }],
}, options);
