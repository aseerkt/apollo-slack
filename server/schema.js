import helloTypes from './typeDefs/hello.type.js';
import helloResolver from './resolvers/hello.resolver.js';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const typeDefs = [helloTypes];

export const resolvers = {
  Query: {
    ...helloResolver.Query,
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
