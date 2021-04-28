import { TipoOperacion, TipoRelacion } from '../../types/enums';
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

export const ParticipacionSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: addNullValue(TipoOperacion),
  },
  tipoRelacion: {
    type: String,
    enum: addNullValue(TipoRelacion),
  },
  nombreEmpresaSociedadAsociacion: string_type,
  rfc: string_type,
  porcentajeParticipacion: Number,
  tipoParticipacion: CatalogoSchema,
  recibeRemuneracion: Boolean,
  montoMensual: MontoSchema,
  ubicacion: UbicacionSchema,
  sector: CatalogoSchema,
});
