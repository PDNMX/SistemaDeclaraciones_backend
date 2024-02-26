import { GraphQLDateTime, GraphQLEmail, GraphQLLimitedString, GraphQLUUID } from 'graphql-custom-types';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLScalarType } from 'graphql';

class ScalarDefinitions {
  /*
   * Define the used scalars resolvers.
   */
  public static build(): Record<string, GraphQLScalarType> {
    return {
      Date: GraphQLDateTime,
      Email: GraphQLEmail,
      JSON: GraphQLJSON,
      LimitedString: new GraphQLLimitedString(0, 500), //255
      UUID: GraphQLUUID
    };
  }
}

export default ScalarDefinitions;
