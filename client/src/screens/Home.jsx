import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import useAllUsersQuery from '../hooks/apollo/queries/allUsers';
import Logo from '../shared/Logo';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Logo color='dark' />

      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
      <Link to='/dashboard'>Dashboard</Link>
    </div>
  );
}
