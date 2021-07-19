import styled from 'styled-components';

export const ChannelHeaderStyled = styled.header`
  height: var(--tch-height);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  h3 {
    margin-bottom: 0;
    font-weight: 900;
  }
`;
