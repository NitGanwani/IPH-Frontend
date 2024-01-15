import { Col, Row } from 'react-bootstrap';
import { useTerminals } from '../../hooks/use.terminals';
import { TerminalCard } from '../terminals/terminal';
import { useEffect } from 'react';

export function Dashboard() {
  const { terminals, handleLoadTerminals } = useTerminals();

  useEffect(() => {
    handleLoadTerminals();
  }, []);

  return (
    <>
      <h1>Terminals</h1>
      <Row>
        {terminals &&
          terminals.map((terminal) => (
            <Col key={terminal.id} sm={12} md={6} lg={4} xl={3}>
              <TerminalCard item={terminal} />
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Dashboard;