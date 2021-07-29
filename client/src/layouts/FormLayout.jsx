import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Typography } from 'antd';
import Logo from '../shared/Logo';

const FormWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Formlayout({ children, title }) {
  return (
    <>
      <FormWrapper>
        <Logo color='dark' />
        <Card style={{ marginTop: '2rem', width: '100%' }}>
          <Typography.Title level={2} style={{ fontWeight: 900 }}>
            {title}
          </Typography.Title>
          {children}
        </Card>
      </FormWrapper>
    </>
  );
}

Formlayout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Formlayout;
