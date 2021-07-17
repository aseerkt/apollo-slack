import styled from 'styled-components';
import { Link } from 'react-router-dom';

import teamWorkLogo from '../assets/undraw_creative_team_r90h.svg';
import Container from '../layouts/Container';
import Logo from '../shared/Logo';

const CreateTeamNav = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;

  h1 {
    font-size: 3rem;
    font-weight: 900;
    line-height: 48px;
  }

  p {
    font-size: 15px;
    margin-bottom: 2rem;
  }

  .create-team-link {
    font-size: 18px;
    color: #fff;
    background-color: var(--purple-light);
    padding: 0.7rem 1.3rem;
    font-weight: 900;
    border-radius: 3px;
    i {
      margin-left: 0.8rem;
    }
  }

  img {
    width: 100%;
    display: none;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 55% auto;
    padding: 0;
    img {
      display: block;
    }
  }
`;

const OrDivider = styled.div`
  position: relative;
  margin: 5rem auto;
  z-index: 2;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    text-align: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #f4f4f4;
    /* z-index: 1; */
    &::before {
      z-index: -1;
      content: '';
      position: absolute;
      left: calc(-50vw + 50%);
      top: 50%;
      width: 100vw;
      height: 1px;
      background-color: lightgray;
    }
  }
`;

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
      <Logo color='dark' />
      <CreateTeamNav>
        <div>
          <h1>Create a new Slack workspace</h1>
          <p>
            Slack gives your team a home — a place where they can talk and work
            together. To create a new workspace, click the button below.
          </p>
          <Link className='create-team-link' to='/create-team'>
            Create WorkSpace
            <i className='fas fa-arrow-right'></i>
          </Link>
        </div>
        <img src={teamWorkLogo} alt='team-work' />
      </CreateTeamNav>
      <OrDivider>
        <span>OR</span>
      </OrDivider>
    </Container>
  );
}

export default Dashboard;
