import ScalarDefinitions from '../scalars';
import { mergeResolvers } from '@graphql-tools/merge';
import { readdirSync } from 'fs';


class Resolvers {
  /*
   * This function combines all the resolvers object
   */
  public static merge(): Record<string, any> {
    const files = readdirSync(__dirname).filter(
      f => (f.endsWith('.js') && f !== 'index.js')
    );
    const resolverFiles = files.map(file => require(`./${file}`).default);
    const resolvers = mergeResolvers(resolverFiles);
    const scalars = ScalarDefinitions.build();

    return Object.assign(resolvers, scalars);
  }
}

export default Resolvers;
