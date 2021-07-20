import { Link, useParams } from 'react-router-dom';
import IconButton from '../../shared/IconButton';
import AddChannel from './AddChannel';
import {
  AddChannelBtn,
  ChannelNavLi,
  ChannelNavUl,
  PaddingXBtn,
} from './styles/SidebarStyles';

function Channels({ channels }) {
  const { teamId } = useParams();

  if (!teamId) return null;

  return (
    <>
      <PaddingXBtn>
        <i className='fas fa-ellipsis-v'></i>
        <span>Browse Slack</span>
      </PaddingXBtn>
      <PaddingXBtn>
        <IconButton fasClass='fas fa-sort-down' />
        <span>Channnels</span>
      </PaddingXBtn>
      <ChannelNavUl>
        {channels?.map(({ id, name }) => (
          <Link key={id} to={`/client/T${teamId}/C${id}`}>
            <ChannelNavLi>
              <span className='hash'>#</span> <span>{name}</span>
            </ChannelNavLi>
          </Link>
        ))}
        <AddChannel>
          <AddChannelBtn>
            <IconButton fasClass='fas fa-plus' filled size='small' />
            <span>Add Channel</span>
          </AddChannelBtn>
        </AddChannel>
      </ChannelNavUl>
    </>
  );
}

export default Channels;
