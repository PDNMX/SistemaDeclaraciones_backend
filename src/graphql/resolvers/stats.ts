import { Context, Stats } from '../../types';
import { StatsRepository } from '../../db/repositories/stats_repo';

export default {
  Query: {
    stats(_: unknown, args: unknown, context: Context): Promise<Stats> {
      return StatsRepository.get(context);

      // const scopes = context.user.scopes;
      // if (scopes.includes('Stats:read:all')) {
      //   return StatsRepository.get(context.user.id);
      // } else if (scopes.includes('Stats:read:mine')) {
      //   return StatsRepository.get(context.user.id);
      // }

      // throw new CreateError.Unauthorized(`User[${context.user.id}] is not allowed to perform this operation.`);
    }
  }
};
