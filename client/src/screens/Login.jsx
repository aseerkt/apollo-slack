import { Form, Input, Button, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Formlayout from '../layouts/FormLayout';
import useLoginMutation from '../hooks/apollo/mutations/login';
import { saveAccessToken } from '../utils/accessTokenHelper';
import { ME_QUERY } from '../hooks/apollo/queries/me';
import toErrorMap from '../utils/toErrorMap';

function Login() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [login, { loading }] = useLoginMutation();

  const onFinish = async function (values) {
    try {
      const res = await login({
        variables: values,
        update: (cache, { data }) => {
          const { user, accessToken } = data?.login || {};
          console.log(data);
          if (user && accessToken) {
            saveAccessToken(accessToken);
            // cache.writeQuery({ query: ME_QUERY, data: user });
            history.push('/');
          }
        },
      });
      const { errors } = res.data?.login;
      if (errors) {
        form.setFields(toErrorMap(errors));
      }
    } catch (err) {}
  };

  return (
    <Formlayout title='Login'>
      <Form
        form={form}
        layout='vertical'
        name='login'
        initialValues={{ usernameOrEmail: '', password: '' }}
        onFinish={onFinish}
      >
        <Form.Item
          label='Username or Email'
          name='usernameOrEmail'
          rules={[
            {
              required: true,
              message: 'Please input your username or email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text>
        Do not have an account? <Link to='/register'>Sign up</Link>
      </Typography.Text>
    </Formlayout>
  );
}

export default Login;
