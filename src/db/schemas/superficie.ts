import { Schema } from 'mongoose';
import { UnidadMedida } from '../../types/enums';
import { addNullValue } from '../../library/utils';


export const SuperficieSchema = new Schema({
  valor: Number,
  unidad: {
    type: String,
    enum: addNullValue(UnidadMedida),
  }
});
