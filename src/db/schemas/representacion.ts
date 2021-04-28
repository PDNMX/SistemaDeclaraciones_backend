import { TipoOperacion, TipoPersona, TipoRelacion, TipoRepresentacion } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { UbicacionSchema } from './ubicacion';
import { addNullValue } from '../../library/utils';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const RepresentacionSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: addNullValue(TipoOperacion),
  },
  tipoRelacion: {
    type: String,
    enum: addNullValue(TipoRelacion),
  },
  tipoRepresentacion: {
    type: String,
    enum: addNullValue(TipoRepresentacion),
  },
  tipoPersona: {
    type: String,
    enum: addNullValue(TipoPersona),
  },
  nombreRazonSocial: string_type,
  rfc: string_type,
  recibeRemuneracion: Boolean,
  montoMensual: MontoSchema,
  fechaInicioRepresentacion: Date,
  ubicacion: UbicacionSchema,
  sector: CatalogoSchema,
});
