import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
};

export function FormContainer({ children }: Props) {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
