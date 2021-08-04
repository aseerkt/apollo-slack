import styled from 'styled-components';

// Channels

export const PaddingXBtn = styled.div`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0 1rem;
  color: #fff;
  opacity: 0.8;
  height: 32px;
  /* line-height: 32px; */
  cursor: pointer;
  display: flex;
  align-items: center;

  i {
    height: 26px;
    width: 26px;
    display: grid;
    place-items: center;
  }

  &:hover {
    opacity: 1;
  }

  span {
    margin-left: 0.4rem;
  }
`;

export const ChannelNavUl = styled.ul`
  padding-left: 0;
`;

export const ChannelNavLi = styled.li`
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0;
  padding-left: 2rem;
  list-style: none;
  width: 100%;
  color: #fff;
  opacity: 0.9;
  height: 32px;
  display: flex;
  align-items: center;

  span {
    margin-left: 0.4rem;
  }

  .hash {
    font-weight: 500;
    font-size: 1rem;
  }

  &:hover {
    background-color: var(--purple-dark);
  }
`;

export const AddChannelBtn = styled(ChannelNavLi)`
  padding-left: 2rem;
`;

// TeamHeader

export const TeamHeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--tch-height);
  cursor: pointer;
  border-bottom: 0.5px solid #522653;
  border-top: 0.5px solid #522653;
  padding: 0 1rem;
  &:hover {
    background-color: var(--purple-dark);
  }
`;

export const TeamMenuHeader = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  line-height: initial;

  .team-icon {
    margin-right: 0.8rem;
    background-color: #444;
    color: #fff;
    height: 2rem;
    width: 2rem;
    display: grid;
    place-items: center;
  }

  .team-details {
    flex: 1;

    p {
      margin-bottom: 0;
    }
  }
`;

export const ToggleTeamOptionsButton = styled.button`
  background-color: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: 900;
  font-size: 18px;
  flex: 1;
  i {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.4rem;
    font-size: 0.8rem;
  }
`;

export const EditButton = styled.button`
  border-radius: 999px;
  border: none;
  outline: none;
  height: 34px;
  width: 34px;
  cursor: pointer;
  background-color: #fff;
`;
