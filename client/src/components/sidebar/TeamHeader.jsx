import PropTypes from 'prop-types';
import {
  EditButton,
  TeamHeaderStyled,
  ToggleTeamOptionsButton,
} from './styles/SidebarStyles';

const TeamHeader = ({ teamName }) => {
  return (
    <TeamHeaderStyled>
      <ToggleTeamOptionsButton>
        <span>{teamName}</span>
        <i className='fas fa-chevron-down'></i>
      </ToggleTeamOptionsButton>
      <EditButton>
        <i className='far fa-edit'></i>
      </EditButton>
    </TeamHeaderStyled>
  );
};

TeamHeader.propTypes = { teamName: PropTypes.string.isRequired };

export default TeamHeader;
