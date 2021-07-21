import { Modal, Form, Input, Button } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useInviteTeamMemberMutation from '../../hooks/apollo/mutations/inviteTeamMember';

function InviteTeamMember({ children, teamName }) {
  const { teamId } = useParams();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [inviteMember, { loading }] = useInviteTeamMemberMutation();

  const openModal = () => setOpen(true);
  const closeModal = () => {
    form.resetFields();
    setOpen(false);
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      const res = await inviteMember({
        variables: { email: values.email, teamId: parseInt(teamId) },
      });
      console.log(res);
      const { ok, errors } = res.data?.inviteTeamMember;
      if (ok) {
        closeModal();
      }
      if (errors) {
        form.setFields(
          errors.map(({ path, message }) => ({
            name: path,
            errors: [message],
          })),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <Modal
        title={`Invite people to ${teamName}`}
        visible={open}
        onOk={onOk}
        onCancel={closeModal}
        okText='Invite'
      >
        <Form form={form} initialValues={{ email: '' }} layout='vertical'>
          <Form.Item
            name='email'
            label='To'
            rules={[
              { required: true, message: 'Please input email' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input placeholder='name@gmail.com' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default InviteTeamMember;
