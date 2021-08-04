import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import useLogoutMutation from '../../../hooks/apollo/mutations/logout';
import AddChannel from '../AddChannel';
import InviteTeamMember from '../InviteTeamMember';
import { TeamMenuHeader } from '../styles/SidebarStyles';

function TeamMenu({ teamName }) {
  const history = useHistory();
  const [logout] = useLogoutMutation();

  return (
    <Menu>
      <Menu.Item key='0'>
        <TeamMenuHeader>
          <div className='team-icon'>{teamName[0].toUpperCase()}</div>
          <div className='team-details'>
            <strong>{teamName}</strong>
            <p>{teamName}.slack.com</p>
          </div>
        </TeamMenuHeader>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='1'>
        <InviteTeamMember teamName={teamName}>
          Invite people to {teamName}
        </InviteTeamMember>
      </Menu.Item>
      <Menu.Item key='2'>
        <AddChannel>Create a channel</AddChannel>
      </Menu.Item>
      <Menu.Item
        onClick={async () => {
          await logout();
          window.location.pathname = '/';
        }}
        key='3'
      >
        Sign out of {teamName}
      </Menu.Item>
      <SubMenu key='4' title='Add workspaces'>
        <Menu.Item
          key='5'
          onClick={() => {
            history.push('/dashboard#team-list');
          }}
        >
          Sign in to another workspace
        </Menu.Item>
        <Menu.Item
          key='6'
          onClick={() => {
            history.push('/create-team');
          }}
        >
          Create a new workspace
        </Menu.Item>
        {/* <Menu.Item key='7' onClick={() => history.push('/dashboard')}>
          Find workspaces
        </Menu.Item> */}
      </SubMenu>
    </Menu>
  );
}

export default TeamMenu;
