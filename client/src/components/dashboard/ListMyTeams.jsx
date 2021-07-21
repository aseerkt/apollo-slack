import { Card, Spin } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAllTeamsQuery from '../../hooks/apollo/queries/allTeams';
import useMeQuery from '../../hooks/apollo/queries/me';

const TeamLink = styled(Link)`
  display: flex;
  align-items: center;
  text-align: left;

  .open-span {
    display: none;
    margin-right: 0.4rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    .open-span {
      display: inline-block;
    }
  }
`;

const TeamAvatar = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 4px;
  margin-right: 0.5rem;
  color: #fff;
  background-color: #444;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 1.3rem;
`;

const TeamTitle = styled.h3`
  font-weight: 900;
  font-size: 1.2rem;
`;

function ListMyTeams() {
  const { data, loading } = useAllTeamsQuery();
  const {
    data: { me },
  } = useMeQuery();

  if (loading) return <Spin size='large' />;

  return (
    <div style={{ width: '100%', padding: '3rem 0', textAlign: 'center' }}>
      <h2>Open a workspace</h2>
      <Card
        hoverable
        style={{ width: '100%', padding: '0' }}
        title={
          <span>
            Workspaces for <strong>{me.email}</strong>
          </span>
        }
        loading={loading}
      >
        {data?.allTeams?.map((t) => (
          <TeamLink to={`/client/T${t.id}/C`} style={{}}>
            <TeamAvatar>
              <strong>{t.name[0].toUpperCase()}</strong>
            </TeamAvatar>
            <TeamTitle>
              <>{t.name}</>
            </TeamTitle>
            <div style={{ marginLeft: 'auto' }}>
              <span className='open-span'>Open</span>
              <i className='fas fa-arrow-right'></i>
            </div>
          </TeamLink>
        ))}
      </Card>
    </div>
  );
}

export default ListMyTeams;
