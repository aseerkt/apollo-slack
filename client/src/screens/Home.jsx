import { Link } from 'react-router-dom';

import Logo from '../shared/Logo';

export default function Home() {
  const { data } = useMeQuery();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Logo color='dark' />

      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
      {data?.me && <Link to='/dashboard'>Dashboard</Link>}
    </div>
  );
}
