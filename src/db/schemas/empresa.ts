import { Schema } from 'mongoose';


export const EmpresaSchema = new Schema({
  nombreEmpresaServicio: {
    type: String,
    trim: true,
  },
  rfc: {
    type: String,
    trim: true,
  },
});
