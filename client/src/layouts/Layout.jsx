import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function Layout() {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default Layout;
