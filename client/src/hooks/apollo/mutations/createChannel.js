import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const CREATE_CHANNEL_MUTATION = gql`
  mutation CreateChannel($name: String!, $teamId: Int!, $private: Boolean) {
    createChannel(name: $name, teamId: $teamId, private: $private)
  }
`;

export default function useCreateChannelMutation(opts) {
  return useMutation(CREATE_CHANNEL_MUTATION, opts);
}
