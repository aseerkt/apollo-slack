import {
  ApolloClient,
  createHttpLink,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client';
import { API_URL } from './constants';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken, saveAccessToken } from '../utils/accessTokenHelper';

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
  credentials: 'include',
});

const afterWareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    const token = headers['x-token'];
    if (token) {
      saveAccessToken(token);
    }
    return response;
  });
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
  link: authLink.concat(afterWareLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
