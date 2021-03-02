import { FormaRecepcion, NivelOrdenGobierno, TipoOperacion, TipoPersona } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const ApoyoSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: TipoOperacion,
  },
  tipoPersona: {
    type: String,
    enum: TipoPersona,
  },
  beneficiarioPrograma: CatalogoSchema,
  nombrePrograma: string_type,
  institucionOtorgante: string_type,
  nivelOrdenGobierno: {
    type: String,
    enum: NivelOrdenGobierno,
  },
  tipoApoyo: CatalogoSchema,
  formaRecepcion: {
    type: String,
    enum: FormaRecepcion,
  },
  montoApoyoMensual: MontoSchema,
  especifiqueApoyo: string_type,
});
