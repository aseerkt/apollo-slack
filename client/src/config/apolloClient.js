import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
