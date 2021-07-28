import { gql, useQuery } from '@apollo/client';

export const GET_TEAM_QUERY = gql`
  query GetTeam($teamId: Int!) {
    getTeam(teamId: $teamId) {
      id
      name
      owner {
        id
        username
      }
      channels {
        id
        name
        private
      }
      members {
        id
        username
      }
    }
  }
`;

export default function useGetTeamQuery(opts) {
  return useQuery(GET_TEAM_QUERY, opts);
}
