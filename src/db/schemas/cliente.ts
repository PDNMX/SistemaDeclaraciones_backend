import { TipoOperacion, TipoRelacion } from '../../types/enums';
import { CatalogoSchema } from './catalogo';
import { EmpresaSchema } from './empresa';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';
import { TerceroSchema } from './tercero';
import { UbicacionSchema } from './ubicacion';


export const ClienteSchema = new Schema({
  tipoOperacion: {
    type: String,
    enum: TipoOperacion,
  },
  realizaActividadLucrativa: Boolean,
  tipoRelacion: {
    type: String,
    enum: TipoRelacion,
  },
  empresa: EmpresaSchema,
  clientePrincipal: TerceroSchema,
  sector: CatalogoSchema,
  montoAproximadoGanancia: MontoSchema,
  ubicacion: UbicacionSchema,
});
