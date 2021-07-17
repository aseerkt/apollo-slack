import { gql, useQuery } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
    }
  }
`;

export default function useMeQuery(opts) {
  return useQuery(ME_QUERY, opts);
}
