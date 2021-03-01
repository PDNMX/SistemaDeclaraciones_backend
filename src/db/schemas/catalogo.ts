import { Schema } from 'mongoose';


export const CatalogoSchema = new Schema({
  clave: {
    type: String,
    trim: true,
    required: true,
  },
  valor: {
    type: String,
    trim: true,
    require: true,
  },
});
