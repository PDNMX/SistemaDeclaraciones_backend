import { DocumentNode } from 'graphql';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';


class GlobalSchema {
  /*
   * This function merges all the .graphql files to create a Global Schema.
   */
  public static build(): DocumentNode {
    const schemasPath = path.join(__dirname, './**/*.graphql');
    const schemas = loadFilesSync(schemasPath);

    return mergeTypeDefs(schemas);
  }
}

export default GlobalSchema;
