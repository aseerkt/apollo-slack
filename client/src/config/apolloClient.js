import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { API_URL } from './constants';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '../utils/accessTokenHelper';

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
