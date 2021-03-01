import { RFCSchema } from './rfc';
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
    required: true
  },
	primerApellido: {
    type: String,
    required: true
  },
	segundoApellido: String,
	curp: {
    type: String,
    required: true
  },
  rfc: {
    type: RFCSchema,
    required: true,
  },

  // ----- READ ONLY ------
  resetToken: ResetTokenSchema,
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
    default: [Role.SUPER_ADMIN],
  },
  declaraciones: [{
    type: Schema.Types.ObjectId,
    ref: 'Declaracion',
  }],
}, options);
