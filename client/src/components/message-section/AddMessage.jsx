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
  height: 100%;

  .text-form-item {
    flex: 1;
    display: inline-block;
    height: 100%;
  }

  .ant-form-item {
    margin-bottom: 0;
    height: 100%;
  }
  .ant-form-item-control {
    height: 100%;

    .ant-form-item-control-input {
      height: 100%;

      .ant-form-item-control-input-content {
        height: 100%;
        input {
          display: flex;
        }
      }
    }
  }
  button {
    margin-left: 1rem;
    height: 100%;
  }
`;

const AddChannelMessage = () => {
  const [form] = Form.useForm();
  const { currentChannel } = useGetTeamInfo();

  const [addMessage, { loading }] = useCreateMessageMutation();

  const onFinish = async function (values) {
    if (!form.getFieldValue('text')) return;
    try {
      const res = await addMessage({
        variables: { channelId: currentChannel.id, ...values },
      });
      if (res.data?.createMessage.message) {
        form.resetFields();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AddMessageStyled>
      <Form
        style={{ height: '100%' }}
        form={form}
        onFinish={onFinish}
        initialValues={{ text: '' }}
        size='large'
      >
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
            <Input
              style={{ height: '100%' }}
              placeholder={`Send a message to #${currentChannel?.name}`}
              required
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

export default AddChannelMessage;
