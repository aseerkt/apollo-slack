import { Alert, Spin } from 'antd';
import useMeQuery from '../hooks/apollo/queries/me';

export default function AuthProvider({ children }) {
  const { loading, error } = useMeQuery();

  if (loading) return <Spin size='large' />;
  if (error) return <Alert message={error.message} type='error' showIcon />;
  return <>{children}</>;
}
