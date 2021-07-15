import { Form, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Formlayout from '../layouts/FormLayout';

function Login() {
  const onFinish = async function (values) {
    try {
    } catch (err) {}
  };

  return (
    <Formlayout title='Login'>
      <Form
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
          <Button type='primary' htmlType='submit'>
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
