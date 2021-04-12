import { TipoDeclaracion } from '../enums';

export interface DeclaracionesFilterInput {
  tipoDeclaracion?: TipoDeclaracion
  declaracionCompleta?: boolean
}
