import { TipoOperacion, TipoRelacion } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { EmpresaSchema } from './empresa';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { TerceroSchema } from './tercero';
import { UbicacionSchema } from './ubicacion';
import { addNullValue } from '../../library/utils';


export const ClienteSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: addNullValue(TipoOperacion),
  },
  realizaActividadLucrativa: Boolean,
  tipoRelacion: {
    type: String,
    enum: addNullValue(TipoRelacion),
  },
  empresa: EmpresaSchema,
  clientePrincipal: TerceroSchema,
  sector: CatalogoSchema,
  montoAproximadoGanancia: MontoSchema,
  ubicacion: UbicacionSchema,
});
