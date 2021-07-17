import { Card, Col, Row, Typography } from 'antd';
import PropTypes from 'prop-types';

function Formlayout({ children, title }) {
  return (
    <Row>
      <Col style={{ margin: '1rem auto' }} md={{ span: 8 }}>
        <Card>
          <Typography.Title level={2} style={{ fontWeight: 900 }}>
            {title}
          </Typography.Title>
          {children}
        </Card>
      </Col>
    </Row>
  );
}

Formlayout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Formlayout;
