import './SlackLayouts.css';

// Grid Layouts

export function AppLayout({ children }) {
  return <section className='wrapper'>{children}</section>;
}

export function TopNav({ children }) {
  return <header className='top-nav'>{children}</header>;
}

export function Sidebar({ children }) {
  return <aside className='sidebar'>{children}</aside>;
}

export function ChannelContent({ children }) {
  return <main className='channel-content'>{children}</main>;
}

export function AddMessageWrapper({ children }) {
  return <div className='add-msg-wrapper'>{children}</div>;
}

// Childrens of layouts

export function ChannelHeader({ children }) {
  return <header className='channel-header'>{children}</header>;
}
