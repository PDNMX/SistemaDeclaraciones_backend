import { TipoDeclaracion } from '../enums';

export interface DeclaracionesFilterInput {
  tipoDeclaracion?: TipoDeclaracion
  simplificada?: boolean
}
