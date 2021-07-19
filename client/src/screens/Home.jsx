import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import useAllUsersQuery from '../hooks/apollo/queries/allUsers';
import Logo from '../shared/Logo';

export default function Home() {
  const { data, loading } = useAllUsersQuery();
  if (loading) {
    return <Spin />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Logo color='dark' />
      <div>
        {data?.allUsers.map((u) => (
          <div key={u.id}>
            <strong>{u.username}</strong>
            <span>{u.email}</span>
          </div>
        ))}
      </div>

      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
      <Link to='/dashboard'>Dashboard</Link>
    </div>
  );
}
