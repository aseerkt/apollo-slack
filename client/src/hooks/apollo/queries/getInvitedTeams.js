import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_TEAM_INVITES_QUERY = gql`
  query GetTeamInvites {
    getInvitedTeams {
      id
      name
      members {
        id
        username
        email
        role
      }
    }
  }
`;

export default function useGetTeamInvitesQuery(opts) {
  return useQuery(GET_TEAM_INVITES_QUERY);
}
