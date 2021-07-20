import styled from 'styled-components';
import { Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import useGetMessagesQuery from '../../hooks/apollo/queries/getMessages';

const MessagesContainer = styled.div`
  height: calc(100vh - var(--msg-content-height));
  padding: 0 1rem;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
`;

const MessageStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0;
`;
const MessageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.5rem;

  p {
    margin-bottom: 0;
  }
`;

const MessageDetail = styled.div`
  display: flex;
  align-items: center;

  strong {
    font-weight: 900;
  }

  span {
    margin-left: 0.5rem;
    color: #555;
    font-weight: 700;
  }
`;

function MessageItem({
  username,
  avatar = 'gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
  text,
  createdAt,
}) {
  return (
    <MessageStyled>
      <Avatar src={avatar} />
      <MessageContent>
        <MessageDetail>
          <strong>{username}</strong>
          <span>{createdAt}</span>
        </MessageDetail>
        <p>{text}</p>
      </MessageContent>
    </MessageStyled>
  );
}

function ChannelMessages() {
  const { channelId } = useParams();
  const { data, loading, subscribeToMore } = useGetMessagesQuery({
    variables: { channelId: parseInt(channelId) },
  });

  if (!channelId || loading) return null;

  console.log(data);

  return (
    <MessagesContainer>
      {data?.getMessages?.map((m) => (
        <MessageItem
          key={m.id}
          username={m.user.username}
          createdAt={m.createdAt}
          text={m.text}
        />
      ))}
    </MessagesContainer>
  );
}

export default ChannelMessages;
