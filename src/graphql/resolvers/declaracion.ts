import {
  Context,
  Declaracion,
  DeclaracionSecciones,
  DeclaracionesFilterInput,
  DeclaracionesPage,
  Role,
  TipoDeclaracion,
} from '../../types';
import { DeclaracionRepository } from '../../db/repositories/declaracion_repo';

export default {
  Query: {
    declaracion(
      _: unknown,
      args: { tipoDeclaracion: TipoDeclaracion, simplificada?: boolean },
      context: Context,
    ): Promise<Declaracion> {
      return DeclaracionRepository.getOrCreate(context.user.id, args.tipoDeclaracion, args.simplificada);
    },

    declaracionesMetadata(_: unknown, args: { userID?: string, filter?: DeclaracionesFilterInput, pageNumber?: number }, context: Context): Promise<DeclaracionesPage> {
      const roles = context.user.roles;
      if (args.userID) {
        if (roles.includes(Role.SUPER_ADMIN) || roles.includes(Role.ADMIN) || args.userID == context.user.id) {
          return DeclaracionRepository.getAllByUser(args.userID, args.filter, args.pageNumber);
        }

        throw new Error('Not allowed to perform this call');
      }

      if (roles.includes(Role.SUPER_ADMIN)) {
        return DeclaracionRepository.getAll(args.filter, args.pageNumber);
      }

      return DeclaracionRepository.getAllByUser(context.user.id, args.filter, args.pageNumber);
    },
  },

  Mutation: {
    declaracion(_: unknown, args: { id: string, declaracion: DeclaracionSecciones }, context: Context): Promise<Declaracion> {
      return DeclaracionRepository.update(args.id, context.user.id, args.declaracion);
    },
  }
};
