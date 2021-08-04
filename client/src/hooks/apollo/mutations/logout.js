import { gql, useMutation } from '@apollo/client';

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export default function useLogoutMutation(opts) {
  return useMutation(LOGOUT_MUTATION, opts);
}
