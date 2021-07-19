import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import useGetTeamInfo from '../../hooks/useGetTeamInfo';
import useCreateMessageMutation from '../../hooks/apollo/mutations/createMessage';

export const AddMessageStyled = styled.div`
  margin: 0 1rem 1rem;
  height: calc(100% - 1rem);
`;

export const AddChatInputWrapper = styled.div`
  display: flex;
  align-items: center;

  .text-form-item {
    flex: 1;
  }

  button {
    margin-left: 1rem;
    height: 100%;
  }
`;

const AddMessage = () => {
  const [form] = Form.useForm();
  const { currentChannel } = useGetTeamInfo();

  const [addMessage, { loading }] = useCreateMessageMutation();

  const onFinish = async function (values) {
    if (!form.getFieldValue('text')) return;
    try {
      const res = await addMessage({
        variables: { channelId: currentChannel.id, ...values },
      });
      console.log(res);
    } catch (err) {}
  };

  return (
    <AddMessageStyled>
      <Form form={form} onFinish={onFinish} initialValues={{ text: '' }}>
        <AddChatInputWrapper>
          <Form.Item
            className='text-form-item'
            name='text'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea
              placeholder={`Send a message #${
                currentChannel?.name || 'welcome'
              }`}
              required
              rows={3}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              icon={<i className='fas fa-paper-plane'></i>}
              type='primary'
              htmlType='submit'
            />
          </Form.Item>
        </AddChatInputWrapper>
      </Form>
    </AddMessageStyled>
  );
};

export default AddMessage;
