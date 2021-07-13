import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const typesArray = loadFilesSync(path.join(__dirname, './typeDefs'));
const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(
  path.join(__dirname, './resolvers/*.resolver.js'),
);
const resolvers = mergeResolvers(resolversArray);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
