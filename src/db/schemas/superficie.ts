import { Schema } from 'mongoose';
import { UnidadMedida } from '../../types/enums';


export const SuperficieSchema = new Schema({
  valor: Number,
  unidad: {
    type: String,
    enum: UnidadMedida,
  }
});
