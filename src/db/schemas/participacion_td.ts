import {  TipoRelacion } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { UbicacionSchema } from './ubicacion';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const ParticipacionTDSchema = new Schema({
  // tipoOperacion: {
  //   type: String,
  //   enum: TipoOperacion,
  // },
  tipoOperacion: string_type,
  tipoRelacion: {
    type: String,
    enum: TipoRelacion,
  },
  tipoInstitucion: CatalogoSchema,
  nombreInstitucion: string_type,
  rfc: string_type,
  puestoRol: string_type,
  fechaInicioParticipacion: Date,
  recibeRemuneracion: Boolean,
  montoMensual: MontoSchema,
  ubicacion: UbicacionSchema,
});
