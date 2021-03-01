import { GraphQLDateTime, GraphQLEmail, GraphQLUUID } from 'graphql-custom-types';
import { GraphQLScalarType } from 'graphql';


class ScalarDefinitions {
  /*
   * Define the used scalars resolvers.
   */
  public static build(): Record<string, GraphQLScalarType> {
    return {
      Date: GraphQLDateTime,
      UUID: GraphQLUUID,
      Email: GraphQLEmail,
    };
  }
}

export default ScalarDefinitions;
