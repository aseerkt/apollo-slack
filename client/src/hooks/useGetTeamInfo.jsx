import { useHistory, useParams } from 'react-router-dom';
import useGetTeamQuery from './apollo/queries/getTeam';

export default function useGetTeamInfo() {
  const history = useHistory();
  const { teamId, channelId } = useParams();
  const { data, loading } = useGetTeamQuery({
    variables: { teamId: parseInt(teamId) },
    skip: typeof teamId !== 'string',
  });

  if (!channelId && data)
    history.replace(`/client/T${teamId}/C${data?.getTeam?.channels[0].id}`);

  const currentChannel = teamId
    ? data?.getTeam?.channels?.find((c) => c.id === parseInt(channelId))
    : data?.getTeam?.channels[0];

  return {
    teamId,
    channelId,
    loading,
    team: data?.getTeam,
    currentChannel,
  };
}
