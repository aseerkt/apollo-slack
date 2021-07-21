import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import useGetTeamInvitesQuery from '../../hooks/apollo/queries/getTeamInvites';

function ListTeamInvites() {
  const { data, loading } = useGetTeamInvitesQuery();

  if (loading) return <Spin size='large' />;

  return (
    <div>
      {data?.getTeamInvites?.map((t) => (
        <Link to={`/client/T${t.id}/C`}>
          <strong>{t.name}</strong>
        </Link>
      ))}
    </div>
  );
}

export default ListTeamInvites;
