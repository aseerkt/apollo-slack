import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useMeQuery from '../hooks/apollo/queries/me';
import Logo from '../shared/Logo';
import ListMyTeams from '../components/dashboard/ListMyTeams';
import ListTeamInvites from '../components/dashboard/ListTeamInvites';
import slackDraw from '../assets/undraw_mobile_testing_reah.svg';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-x: hidden;
  z-index: 2;
`;

const NavHeader = styled.header`
  max-width: 1100px;
  padding: 0 2rem;
  margin: 1rem auto;
  height: 80px;
  border-radius: 999px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--purple);
  color: #f4f4f4;
`;

export const NavLinks = styled.nav`
  display: flex;

  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-transform: uppercase;
    box-shadow: inset 0 0 0 1px;
    ${(props) => (props.primary ? '#fff' : 'var(--purple)')};
    background: ${(props) => (props.primary ? 'var(--purple)' : '#fff')};
    color: ${(props) => (props.primary ? '#fff' : 'var(--purple)')};
    padding: 0 1rem;
    height: ${(props) => (props.size === 'large' ? '3rem' : '2rem')};
    border-radius: 4px;
    font-weight: 700;
    margin-left: 0.5rem;

    &:hover {
      border-width: 2px;
      box-shadow: inset 0 0 0 2px
        ${(props) => (props.primary ? '#fff' : 'var(--purple)')};
    }

    &.cta {
      background-color: #fff;
      color: #111;
      &:hover {
        box-shadow: ${(props) =>
          props.primary ? 'inset 0 0 0 2px var(--purple)' : 'unset'};
      }
    }
  }
`;

export const MainSection = styled.section`
  max-width: 1100px;
  position: relative;
  overflow-x: hidden;
  margin: 3rem auto;
  padding: 2rem 1.5rem;
`;

export const TeamSection = styled.section`
  max-width: 700px;
  margin: auto;
`;

export const IntroSection = styled.div`
  display: grid;
  margin-top: 5rem;
  grid-template-columns: 1fr;
  align-items: center;

  .hero-image {
    order: 1;
    margin-bottom: 1rem;
  }
  .content {
    order: 2;
  }

  .content {
    h1 {
      font-size: 2rem;
      font-weight: 900;
      line-height: 1.2;
    }
    p {
      font-size: 1.2rem;
    }
  }

  img {
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;

    .hero-image {
      order: 2;
      margin-bottom: unset;
    }

    .content {
      order: 1;

      h1 {
        font-size: 3rem;
        font-weight: 900;
        line-height: 1.2;
      }
      p {
        font-size: 1.5rem;
      }
    }
  }
`;

export default function Home() {
  const { data } = useMeQuery();
  return (
    <>
      <HeaderWrapper>
        <NavHeader>
          <Logo />

          <nav>
            {data?.me ? (
              <NavLinks>
                <Link className='cta' to='/create-team'>
                  Create Workspace
                </Link>
              </NavLinks>
            ) : (
              <NavLinks>
                <Link to='/register'>Register</Link>
                <Link className='cta' to='/login'>
                  Login
                </Link>
              </NavLinks>
            )}
          </nav>
        </NavHeader>
      </HeaderWrapper>

      <MainSection>
        {data?.me ? (
          <TeamSection>
            <ListMyTeams />
            <ListTeamInvites />
          </TeamSection>
        ) : (
          <IntroSection>
            <div className='content'>
              <h1>Welcome to your digital HQ for success from anywhere</h1>
              <p>
                Transform the way that you work with one place for everyone and
                everything that you need to get things done.
              </p>
              <NavLinks primary size='large'>
                <Link to='/register'>Try for free</Link>
                <Link className='cta' to='/login'>
                  Sign In
                </Link>
              </NavLinks>
            </div>
            <div className='hero-image'>
              <img src={slackDraw} alt='slack draw' />
            </div>
          </IntroSection>
        )}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/aseerkt/apollo-slack'
          >
            Contribute to Apollo Slack
          </a>
          <p>aseerkt &copy; {new Date().getFullYear()}</p>
        </div>
      </MainSection>
    </>
  );
}
