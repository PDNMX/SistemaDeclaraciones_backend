import { GraphQLError, GraphQLFormattedError, GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import Directives from './directives';
import Express from 'express';
import GlobalSchema from './schemas';
import Resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import { schemaComposer} from 'graphql-compose';
import { stitchSchemas } from '@graphql-tools/stitch';


class GraphqlAPI {
  public static PATH = '/graphql';
  private static instance: GraphqlAPI;
  private schema: GraphQLSchema;
  private server: ApolloServer;

  private constructor(schema: GraphQLSchema) {
    this.schema = schema;
    this.server = new ApolloServer({
      schema: this.schema,
      // playground: Config.get('NODE_ENV') === 'development',
      formatError: GraphqlAPI.formatError,
      context: ({ req }) => req,
    });
  }

  /*
   * Gets the GraphqlAPI singleton instance.
   * @return {GraphqlAPI}
   */
  public static async create(app: Express.Application): Promise<GraphqlAPI> {
    if (!GraphqlAPI.instance) {
      const schemaOne = makeExecutableSchema({
        typeDefs: GlobalSchema.build(),
        resolvers: Resolvers.merge(),
        inheritResolversFromInterfaces: true,
        schemaDirectives: Directives.build(),
      });

      schemaComposer.Query.addFields({
        hello2: {
          type: 'String',
          resolve: () => 'HELLO WORD FROM 3',
        },
      });
      const schemaTwo = schemaComposer.buildSchema();
      const schema = stitchSchemas({
        subschemas: [
          {schema: schemaOne },
          {schema: schemaTwo},
        ]
      });

      GraphqlAPI.instance = new GraphqlAPI(schema);
      GraphqlAPI.instance.getServer().applyMiddleware({ app, path: GraphqlAPI.PATH });
    }

    return GraphqlAPI.instance;
  }

  /*
   * Returns the executable schema for the client API
   * @return {GraphQLSchema}
   */
  public getSchema(): GraphQLSchema {
    return this.schema;
  }

  /*
   * Returns ApolloServer associated with the schema
   * @return {ApolloServer}
   */
  public getServer(): ApolloServer {
    return this.server;
  }

  /*
   * Function to format the error before displaying it to the user
   */
  private static formatError(error: GraphQLError): GraphQLFormattedError {
    return error;
  }
}

export default GraphqlAPI;
