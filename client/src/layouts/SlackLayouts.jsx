import styled from 'styled-components';

// Grid Layouts

export const AppLayout = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-areas:
    'topnav topnav'
    'sidebar channelmsgs'
    'sidebar addmsg';
  grid-template-rows: var(--top-nav-height) auto var(--add-msg-height);
  grid-template-columns: var(--sidebar-width) auto;
`;

export const TopNav = styled.header`
  grid-area: topnav;
  background-color: #350d36;
  box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
`;

export const Sidebar = styled.aside`
  grid-area: sidebar;
  overflow: auto;
  background-color: #3f0e40;
`;

export const ChannelContent = styled.section`
  grid-area: channelmsgs;
  display: flex;
  flex-direction: column;
`;

export const AddMessageWrapper = styled.div`
  grid-area: addmsg;
`;
