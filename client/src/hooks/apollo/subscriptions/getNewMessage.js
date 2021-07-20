import { gql } from '@apollo/client';

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewChannelMessage($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;
