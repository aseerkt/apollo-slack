import { gql, useQuery } from '@apollo/client';

export const GET_MESSAGES_QUERY = gql`
  query GetMessages($channelId: Int!) {
    getMessages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export default function useGetMessagesQuery(opts) {
  return useQuery(GET_MESSAGES_QUERY, opts);
}
