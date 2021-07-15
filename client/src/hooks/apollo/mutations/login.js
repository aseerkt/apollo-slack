import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ok
      accessToken
      user {
        id
        username
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

export default function useLoginMutation(opts) {
  return useMutation(LOGIN_MUTATION, opts);
}
