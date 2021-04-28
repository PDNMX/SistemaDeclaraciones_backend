import { FormaRecepcion, NivelOrdenGobierno, TipoOperacion, TipoPersona } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { addNullValue } from '../../library/utils';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const ApoyoSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: addNullValue(TipoOperacion),
  },
  tipoPersona: {
    type: String,
    enum: addNullValue(TipoPersona),
  },
  beneficiarioPrograma: CatalogoSchema,
  nombrePrograma: string_type,
  institucionOtorgante: string_type,
  nivelOrdenGobierno: {
    type: String,
    enum: addNullValue(NivelOrdenGobierno),
  },
  tipoApoyo: CatalogoSchema,
  formaRecepcion: {
    type: String,
    enum: addNullValue(FormaRecepcion),
  },
  montoApoyoMensual: MontoSchema,
  especifiqueApoyo: string_type,
});
