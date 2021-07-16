import { Link } from 'react-router-dom';
import useAllUsersQuery from '../hooks/apollo/queries/allUsers';

export default function Home() {
  const { data, loading } = useAllUsersQuery();
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      <Link to='/create-team'>Create team</Link>
    </div>
  );
}
