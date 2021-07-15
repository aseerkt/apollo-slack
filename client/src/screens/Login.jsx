import Form from 'antd/lib/form/Form';
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
      ></Form>
    </Formlayout>
  );
}

export default Login;
