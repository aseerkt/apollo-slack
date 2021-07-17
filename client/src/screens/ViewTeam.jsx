import {
  AddMessageWrapper,
  ChannelContent,
  Sidebar,
  TopNav,
  AppLayout,
} from '../layouts/SlackLayouts';

function ViewTeam() {
  return (
    <AppLayout>
      <TopNav />
      <Sidebar />
      <ChannelContent />
      <AddMessageWrapper />
    </AppLayout>
  );
}

export default ViewTeam;
