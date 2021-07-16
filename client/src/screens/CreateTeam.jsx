import { Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import useCreateTeamMutation from '../hooks/apollo/mutations/createTeam';
import Formlayout from '../layouts/FormLayout';

function CreateTeam() {
  const history = useHistory();
  const [form] = Form.useForm();
  const [createTeam, { loading }] = useCreateTeamMutation();

  const onFinish = async function (values) {
    try {
      const res = await createTeam({ variables: values });
      console.log(res);
      if (res.ok) {
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formlayout title='Create team'>
      <Form
        form={form}
        initialValues={{ name: '' }}
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item name='name' label='Team name'>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type='primary' htmlType='text'>
            Create team
          </Button>
        </Form.Item>
      </Form>
    </Formlayout>
  );
}

export default CreateTeam;
