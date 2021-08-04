import PropTypes from 'prop-types';
import { Dropdown } from 'antd';
import {
  EditButton,
  TeamHeaderStyled,
  ToggleTeamOptionsButton,
} from '../styles/SidebarStyles';
import TeamMenu from './TeamMenu';

const TeamHeader = ({ teamName }) => {
  return (
    <TeamHeaderStyled>
      <Dropdown
        overlayStyle={{
          minWidth: '220px',
          borderRadius: '0.3rem',
          overflow: 'hidden',
        }}
        overlay={<TeamMenu teamName={teamName} />}
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
