import { useParams } from 'react-router-dom';
import useGetTeamQuery from './apollo/queries/getTeam';

export default function useGetTeamInfo() {
  const { teamId, channelId } = useParams();
  const { data, loading } = useGetTeamQuery({
    variables: { teamId: parseInt(teamId) },
    skip: typeof teamId !== 'string',
  });

  const currentChannel = data?.getTeam?.channels?.find(
    (c) => c.id === parseInt(channelId),
  );

  return {
    team: data?.getTeam,
    loading,
    currentChannel,
  };
}
