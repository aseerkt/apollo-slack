import { Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import useCreateTeamMutation from '../hooks/apollo/mutations/createTeam';
import { ALL_TEAMS_QUERY } from '../hooks/apollo/queries/allTeams';
import Formlayout from '../layouts/FormLayout';
import toErrorMap from '../utils/toErrorMap';

function CreateTeam() {
  const history = useHistory();
  const [form] = Form.useForm();
  const [createTeam, { loading }] = useCreateTeamMutation();

  const onFinish = async function (values) {
    try {
      const res = await createTeam({
        variables: values,
        refetchQueries: [{ query: ALL_TEAMS_QUERY }],
      });
      console.log(res);
      const { teamId, errors } = res.data?.createTeam;
      if (teamId) {
        history.push(`/client/T${teamId}/C`);
      }
      if (errors) {
        form.setFields(toErrorMap(errors));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formlayout title='Create Workspace'>
      <Form
        form={form}
        initialValues={{ name: '' }}
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item name='name' label='Workspace name'>
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
