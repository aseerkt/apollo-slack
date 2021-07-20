import { gql, useMutation } from '@apollo/client';

const INVITE_TEAM_MEMBER_MUTATION = gql`
  mutation InviteTeamMember($email: String!, $teamId: Int!) {
    inviteTeamMember(email: $email, teamId: $teamId) {
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

export default function useInviteTeamMemberMutation(opts) {
  return useMutation(INVITE_TEAM_MEMBER_MUTATION, opts);
}
