import { gql, useQuery } from '@apollo/client';

export const ME_QUERY = gql`
  query AllUsers {
    allUsers {
      id
    }
  }
`;

export default function useMeQuery(opts) {
  return useQuery(ME_QUERY, opts);
}
