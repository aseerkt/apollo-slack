import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconButtonStyled = styled.button`
  background-color: ${(props) =>
    props.filled ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  width: ${(props) => (props.size === 'small' ? '20px' : '26px')};
  height: ${(props) => (props.size === 'small' ? '20px' : '26px')};
  border-radius: 4px;
  border: none;
  padding: unset;
  outline: none;
  display: grid;
  place-items: center;
  user-select: none;
  cursor: pointer;
  opacity: 0.9 !important;
  color: #fff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  i {
    font-size: 80%;
  }
`;

export default function IconButton({ fasClass, ...props }) {
  return (
    <IconButtonStyled {...props}>
      <i className={fasClass}></i>
    </IconButtonStyled>
  );
}

IconButton.defaultProps = {
  filled: false,
  size: 'medium',
};

IconButton.propTypes = {
  fasClass: PropTypes.string.isRequired,
  filled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
