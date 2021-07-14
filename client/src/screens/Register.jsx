import { Form, Input, Button } from 'antd';
import useRegisterMutation from '../hooks/apollo/mutations/register';
import Formlayout from '../layouts/FormLayout';

export default function Register() {
  const [register, { loading }] = useRegisterMutation();

  const onFinish = async (values) => {
    try {
      const res = await register({
        variables: values,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Formlayout title='Register'>
      <Form
        layout='vertical'
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Invalid email address',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type='primary' htmlType='submit'>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </Formlayout>
  );
}
