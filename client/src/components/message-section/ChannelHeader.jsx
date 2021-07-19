import useGetTeamInfo from '../../hooks/useGetTeamInfo';
import { ChannelHeaderStyled } from './styles/MessageSectionStyles';

function ChannelHeader() {
  const { currentChannel, team } = useGetTeamInfo();
  return (
    <ChannelHeaderStyled>
      <h3>
        # {currentChannel?.name || `Welcome to ${team?.name}`}{' '}
        <i className='fas fa-chevron-down'></i>
      </h3>
    </ChannelHeaderStyled>
  );
}

export default ChannelHeader;
