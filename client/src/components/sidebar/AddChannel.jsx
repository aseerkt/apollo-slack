import { useState } from 'react';
import { Modal, Form, Input, Switch } from 'antd';
import { useParams } from 'react-router-dom';
import useCreateChannelMutation from '../../hooks/apollo/mutations/createChannel';
import { GET_TEAM_QUERY } from '../../hooks/apollo/queries/getTeam';

function AddChannel({ children }) {
  const { teamId } = useParams();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [createChannel, { loading }] = useCreateChannelMutation();

  const openModal = () => setOpen(true);
  const closeModal = () => {
    form.resetFields();
    setOpen(false);
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      const res = await createChannel({
        variables: { ...values, teamId: parseInt(teamId) },
        refetchQueries: [
          { query: GET_TEAM_QUERY, variables: { teamId: parseInt(teamId) } },
        ],
      });
      if (res.data?.createChannel) {
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <Modal
        title='Create a channel'
        visible={open}
        onCancel={closeModal}
        onOk={onOk}
        okText='Create'
        okButtonProps={{
          loading,
        }}
      >
        <Form
          name='addChannel'
          layout='vertical'
          form={form}
          initialValues={{ name: '', private: false }}
        >
          <p>
            Channels are where your team communicates. They’re best when
            organized around a topic — #marketing, for example.
          </p>
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input the channel name',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Make private'
            name='private'
            valuePropName='checked'
            help='When a channel is set to private, it can only be viewed or joined by invitation.'
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddChannel;
