import { gql, useMutation } from '@apollo/client';

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text) {
      message {
        id
        text
        createdAt
      }
      errors {
        path
        message
      }
    }
  }
`;

export default function useCreateMessageMutation(opts) {
  return useMutation(CREATE_MESSAGE_MUTATION, opts);
}
