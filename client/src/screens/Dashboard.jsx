import Container from '../layouts/Container';
import DashboardIntro from '../components/dashboard/DashboardIntro';
import ListMyTeams from '../components/dashboard/ListMyTeams';
import ListTeamInvites from '../components/dashboard/ListTeamInvites';

function Dashboard() {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5rem',
      }}
    >
      <DashboardIntro />
      <ListMyTeams />
      <ListTeamInvites />
    </Container>
  );
}

export default Dashboard;
