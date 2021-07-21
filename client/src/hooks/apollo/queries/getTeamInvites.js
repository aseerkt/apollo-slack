import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_TEAM_INVITES_QUERY = gql`
  query GetTeamInvites {
    getTeamInvites {
      id
      createdAt
      teamId
      team {
        id
        name
        owner {
          username
          email
        }
      }
    }
  }
`;

export default function useGetTeamInvitesQuery(opts) {
  return useQuery(GET_TEAM_INVITES_QUERY);
}
