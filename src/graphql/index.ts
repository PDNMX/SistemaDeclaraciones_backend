import { ApolloError, ApolloServer } from 'apollo-server-express';
import { GraphQLError, GraphQLFormattedError, GraphQLSchema } from 'graphql';
import CreateError from 'http-errors';
import Directives from './directives';
import Express from 'express';
import GlobalSchema from './schemas';
import Resolvers from './resolvers';
import { getReasonPhrase } from 'http-status-codes';
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
      debug: process.env.NODE_ENV == 'development',
      playground: process.env.NODE_ENV == 'development',
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
    if (error.originalError) {
      if (CreateError.isHttpError(error.originalError)) {
        const httpError = error.originalError as CreateError.HttpError;
        return new ApolloError(httpError.message, getReasonPhrase(httpError.status), httpError.properties);
      }

      if (Object.prototype.hasOwnProperty.call(error.originalError, 'message')
          && error.originalError.message == 'Your token is expired'
      ) {
        const httpError = new CreateError.Unauthorized(error.originalError.message);
        return new ApolloError(
            error.originalError.message,
            getReasonPhrase(httpError.status),
            httpError.properties
        );
      }

      return error.originalError;
    }

    return new ApolloError('Something went wrong', 'INTERNAL_SERVER_ERROR', {
      error: error,
    });
  }
}

export default GraphqlAPI;
