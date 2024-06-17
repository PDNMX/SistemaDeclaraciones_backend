import { Context, CounterStat, Stats } from '../../types';
import CreateError from 'http-errors';
import DeclaracionModel from '../models/declaracion_model';
import { Role } from './../../types/enums';
import UserModel from '../models/user_model';
import mongoose from 'mongoose';

export class StatsRepository {
  public static async get(context: Context): Promise<Stats> {
    const filters: Record<string, any> = {};
    const { id, scopes } = context.user;

    if (scopes.includes('Stats:read:all')) {
      // return StatsRepository.get(context.user.id);
      const user = await UserModel.findById({ _id: id });
      if (!user?.roles.includes(Role.ROOT)) {
        const institucion = user?.institucion?.clave;
        if (institucion) {
          filters['institucion'] = institucion;
        }
      }
    } else if (scopes.includes('Stats:read:mine')) {
      // return StatsRepository.get(context.user.id);
      filters['owner'] = mongoose.Types.ObjectId(id);
    } else {
      throw new CreateError.Unauthorized(`User[${id}] is not allowed to perform this operation.`);
    }

    const results = await DeclaracionModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: { tipoDeclaracion: 1, owner: 1, institucion: '$user.institucion.clave' }
      },
      { $match: { ...filters } },
      { $group: { _id: '$tipoDeclaracion', count: { $sum: 1 } } }
    ]);

    const counters: CounterStat[] = [];
    let total = 0;
    results.forEach(tipo => {
      total += tipo.count;
      counters.push({
        tipoDeclaracion: tipo._id,
        count: tipo.count
      });
    });

    return { total, counters };
  }
}
