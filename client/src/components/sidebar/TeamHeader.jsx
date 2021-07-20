import { Dropdown, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AddChannel from './AddChannel';
import InviteTeamMember from './InviteTeamMember';
import {
  EditButton,
  TeamHeaderStyled,
  ToggleTeamOptionsButton,
} from './styles/SidebarStyles';

const TeamHeader = ({ teamName }) => {
  const history = useHistory();
  const OptionsMenu = (
    <Menu>
      <Menu.Item key='0'>
        <div>
          <div>{teamName[0].toUpperCase()}</div>
          <div>
            <strong>{teamName}</strong>
            <p>{teamName}.slack.com</p>
          </div>
        </div>
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
      <Menu.Item key='3'>Sign out of {teamName}</Menu.Item>
      <SubMenu title='Add workspaces'>
        <Menu.Item key='4'>Sign in to another workspace</Menu.Item>
        <Menu.Item
          key='5'
          onClick={() => {
            history.push('/create-team');
          }}
        >
          Create a new workspace
        </Menu.Item>
        <Menu.Item key='6' onClick={() => history.push('/dashboard')}>
          Find workspaces
        </Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <TeamHeaderStyled>
      <Dropdown
        overlayStyle={{ minWidth: '220px' }}
        overlay={OptionsMenu}
        trigger={['click']}
      >
        <ToggleTeamOptionsButton>
          <span>{teamName}</span>
          <i className='fas fa-chevron-down'></i>
        </ToggleTeamOptionsButton>
      </Dropdown>
      <EditButton>
        <i className='far fa-edit'></i>
      </EditButton>
    </TeamHeaderStyled>
  );
};

TeamHeader.propTypes = { teamName: PropTypes.string.isRequired };

export default TeamHeader;
