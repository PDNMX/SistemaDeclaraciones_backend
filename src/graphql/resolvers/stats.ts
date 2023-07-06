import { Context, Stats } from '../../types';
import CreateError from 'http-errors';
import { StatsRepository } from '../../db/repositories/stats_repo';

export default {
  Query: {
    stats(_: unknown, args: unknown, context: Context): Promise<Stats> {
      //QUE PRIMERO LEA LAS PROPIAS
      const scopes = context.user.scopes;
      if (scopes.includes('Stats:read:mine'))  {
        return StatsRepository.get(context.user.id);
      } else if (scopes.includes('Stats:read:all')) {
        return StatsRepository.get();
      }

      throw new CreateError.Unauthorized(`User[${context.user.id}] is not allowed to perform this operation.`);
    },
  },
};
