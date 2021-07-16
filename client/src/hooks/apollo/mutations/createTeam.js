import { useMutation, gql } from '@apollo/client';

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default function useCreateTeamMutation(opts) {
  return useMutation(CREATE_TEAM_MUTATION, opts);
}
