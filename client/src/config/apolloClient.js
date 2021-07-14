import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { API_URL } from './constants';

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
