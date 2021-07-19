import { Spin } from 'antd';
import Channels from '../components/sidebar/Channels';
import TeamHeader from '../components/sidebar/TeamHeader';
import ChannelHeader from '../components/message-section/ChannelHeader';
import useGetTeamInfo from '../hooks/useGetTeamInfo';
import {
  AddMessageWrapper,
  ChannelContent,
  Sidebar,
  TopNav,
  AppLayout,
} from '../layouts/SlackLayouts';
import AddMessage from '../components/message-section/AddMessage';
import ChannelMessages from '../components/message-section/ChannelMessages';

function ViewTeam() {
  const { team, loading } = useGetTeamInfo();

  if (loading) return <Spin size='large' />;

  return (
    <AppLayout>
      <TopNav />
      <Sidebar>
        <TeamHeader teamName={team?.name} />
        <Channels channels={team?.channels} />
      </Sidebar>
      <ChannelContent>
        <ChannelHeader />
        <ChannelMessages />
      </ChannelContent>
      <AddMessageWrapper>
        <AddMessage />
      </AddMessageWrapper>
    </AppLayout>
  );
}

export default ViewTeam;
