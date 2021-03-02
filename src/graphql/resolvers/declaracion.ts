import {
  Context,
  Declaracion,
  DeclaracionDocument,
  DeclaracionSecciones,
  DeclaracionesFilterInput,
  Pagination,
  PaginationInputOptions,
  TipoDeclaracion,
} from '../../types';
import CreateError from 'http-errors';
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

    declaracionesMetadata(_: unknown, args: { userID?: string, filter?: DeclaracionesFilterInput, pagination?: PaginationInputOptions }, context: Context): Promise<Pagination<DeclaracionDocument>> {
      const scopes = context.user.scopes;
      if (args.userID) {
        if (scopes.includes('DeclarationMetada:read:all')) {
          return DeclaracionRepository.getAllByUser(args.userID, args.filter, args.pagination);
        } else if (args.userID == context.user.id && scopes.includes('DeclarationMetada:read:mine')) {
          return DeclaracionRepository.getAllByUser(args.userID, args.filter, args.pagination);
        }

        throw new CreateError.Unauthorized(`User[${context.user.id}] is not allowed to perform this operation.`);
      }

      if (scopes.includes('DeclarationMetada:read:all')) {
        return DeclaracionRepository.getAll(args.filter, args.pagination);
      } else if (scopes.includes('DeclarationMetada:read:mine')) {
        return DeclaracionRepository.getAllByUser(context.user.id, args.filter, args.pagination);
      }

      throw new CreateError.Unauthorized(`User[${context.user.id}] is not allowed to perform this operation.`);
    },
  },

  Mutation: {
    declaracion(_: unknown, args: { id: string, declaracion: DeclaracionSecciones }, context: Context): Promise<Declaracion> {
      return DeclaracionRepository.update(args.id, context.user.id, args.declaracion);
    },
    deleteDeclaracion(_: unknown, args: { id: string }, context: Context): Promise<boolean> {
      return DeclaracionRepository.delete(args.id, context.user.id);
    },
    firmarDeclaracion(_: unknown, args: { id: string }, context: Context): Promise<Record<string, any> | null> {
      return DeclaracionRepository.sign(args.id, context.user.id);
    },
  }
};
