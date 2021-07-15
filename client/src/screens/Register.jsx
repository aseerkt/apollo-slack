import { Form, Input, Button, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import useRegisterMutation from '../hooks/apollo/mutations/register';
import Formlayout from '../layouts/FormLayout';
import toErrorMap from '../utils/toErrorMap';

export default function Register() {
  const history = useHistory();
  const [form] = Form.useForm();
  const [register, { loading }] = useRegisterMutation();

  const onFinish = async function (values) {
    try {
      const res = await register({
        variables: values,
      });
      console.log(res);
      const { ok, errors } = res.data?.register;
      if (errors) form.setFields(toErrorMap(errors));
      if (ok) history.push('/login');
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
        form={form}
        layout='vertical'
        name='register'
        initialValues={{
          email: '',
          username: '',
          password: '',
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
      <Typography.Text>
        Already have an account? <Link to='/login'>Login</Link>
      </Typography.Text>
    </Formlayout>
  );
}
