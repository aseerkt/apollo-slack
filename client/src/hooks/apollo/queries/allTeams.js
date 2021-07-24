import { gql, useQuery } from '@apollo/client';

export const ALL_TEAMS_QUERY = gql`
  query AllTeams {
    allTeams {
      id
      name
      channels {
        id
        name
        private
      }
    }
  }
`;

export default function useAllTeamsQuery(opts) {
  return useQuery(ALL_TEAMS_QUERY, opts);
}
