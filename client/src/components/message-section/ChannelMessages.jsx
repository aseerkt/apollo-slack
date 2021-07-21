import styled from 'styled-components';
import { Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import useGetMessagesQuery from '../../hooks/apollo/queries/getMessages';
import { useCallback, useEffect } from 'react';
import { NEW_MESSAGE_SUBSCRIPTION } from '../../hooks/apollo/subscriptions/getNewMessage';

const MessagesContainer = styled.div`
  height: calc(100vh - var(--msg-content-height));
  padding: 1rem;
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
      <Avatar shape='square' src={avatar} />
      <MessageContent>
        <MessageDetail>
          <strong>{username}</strong>
          <span>{new Date(parseInt(createdAt)).toISOString()}</span>
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

  const subscribeToNewMessages = useCallback(
    () =>
      subscribeToMore({
        document: NEW_MESSAGE_SUBSCRIPTION,
        variables: { channelId: parseInt(channelId) },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessageData = subscriptionData.data.newChannelMessage;
          return {
            getMessages: [newMessageData, ...prev.getMessages],
          };
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [channelId],
  );

  useEffect(() => {
    subscribeToNewMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  if (!channelId || loading) return null;

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
