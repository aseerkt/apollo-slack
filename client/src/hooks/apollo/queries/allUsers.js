import { gql, useQuery } from '@apollo/client';

const ALL_USERS_QUERY = gql`
  query AllUsers {
    allUsers {
      id
      email
      username
    }
  }
`;

export default function useAllUsersQuery(opts) {
  return useQuery(ALL_USERS_QUERY, opts);
}
