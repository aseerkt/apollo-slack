import { gql, useMutation } from '@apollo/client';

const INVITE_TEAM_MEMBER_MUTATION = gql`
  mutation InviteTeamMember($email: String!, $teamId: Int!) {
    inviteTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default function useInviteTeamMemberMutation(opts) {
  return useMutation(INVITE_TEAM_MEMBER_MUTATION, opts);
}
