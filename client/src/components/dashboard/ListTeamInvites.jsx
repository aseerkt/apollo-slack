import { Button, Card, Spin } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import useAcceptTeamInvitationMutation from '../../hooks/apollo/mutations/acceptTeamInvitation';
import useGetTeamInvitesQuery from '../../hooks/apollo/queries/getTeamInvites';
import useMeQuery from '../../hooks/apollo/queries/me';

const InvitedBy = styled.p`
  text-align: left;
  color: #555;
  margin-left: 0.2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  i {
    margin-right: 0.3rem;
  }
`;

const TeamItem = styled.div`
  display: flex;
  align-items: center;
  text-align: left;

  .open-span {
    display: none;
    margin-right: 0.4rem;
  }

  &:hover {
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

function ListTeamInvites() {
  const history = useHistory();
  const { data, loading } = useGetTeamInvitesQuery();
  const [acceptTeamInvitation, { loading: accepting }] =
    useAcceptTeamInvitationMutation();
  const {
    data: { me },
  } = useMeQuery();

  if (loading) return <Spin size='large' />;

  if (!loading && (!data?.getTeamInvites || data?.getTeamInvites.length === 0))
    return null;

  const acceptInvite = (teamId) => async () => {
    try {
      alert(teamId);
      const res = await acceptTeamInvitation({ variables: { teamId } });
      console.log(res);
      if (res.data?.acceptTeamInvitation) {
        history.push(`/client/T${teamId}/C`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ width: '100%', padding: '3rem 0', textAlign: 'center' }}>
      <h2>Accept an invitation</h2>
      <Card
        hoverable
        style={{ width: '100%', padding: '0' }}
        title={
          <span>
            Invites for <strong>{me.email}</strong>
          </span>
        }
        loading={loading}
      >
        {data?.getTeamInvites?.map(({ team: t }) => (
          <div key={`/client/T${t.id}/C`}>
            <InvitedBy>
              <i className='fas fa-user-plus'></i>
              Invited by {t.owner.username} ({t.owner.email})
            </InvitedBy>
            <TeamItem>
              <TeamAvatar>
                <strong>{t.name[0].toUpperCase()}</strong>
              </TeamAvatar>
              <TeamTitle>
                <>{t.name}</>
              </TeamTitle>
              <div style={{ marginLeft: 'auto' }}>
                <Button loading={accepting} onClick={acceptInvite(t.id)}>
                  Join
                </Button>
              </div>
            </TeamItem>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default ListTeamInvites;
