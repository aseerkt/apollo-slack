import { Modal, Form, Input, Button } from 'antd';
import { useState } from 'react';

function InviteTeamMember({ children, teamName }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const openModal = () => setOpen(true);
  const closeModal = () => {
    form.resetFields();
    setOpen(false);
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
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
        footer={[
          <Button type='primary' htmlType='submit' form={form}>
            Invite
          </Button>,
        ]}
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='email' label='To' help='Seperate emails by comma'>
            <Input placeholder='name@gmail.com' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default InviteTeamMember;
