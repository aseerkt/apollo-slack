import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default function useRegisterMutation() {
  return useMutation(REGISTER_MUTATION);
}
