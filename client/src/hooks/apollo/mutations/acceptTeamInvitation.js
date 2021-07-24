import { gql, useMutation } from '@apollo/client';

const ACCEPT_TEAM_INVITATION_MUATION = gql`
  mutation AcceptTeamInvitation($teamId: Int!) {
    acceptTeamInvitation(teamId: $teamId)
  }
`;

export default function useAcceptTeamInvitationMutation(opts) {
  return useMutation(ACCEPT_TEAM_INVITATION_MUATION, opts);
}
