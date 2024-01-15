import { Col, Row } from 'react-bootstrap';
import { useTerminals } from '../../hooks/use.terminals';
import { TerminalCard } from '../terminals/terminal';
import { useEffect } from 'react';
import { GroupCard } from '../groups/group';
import { useGroups } from '../../hooks/use.groups';

export function Dashboard() {
  const { groups, handleLoadGroups } = useGroups();
  const { terminals, handleLoadTerminals } = useTerminals();

  useEffect(() => {
    handleLoadTerminals();
    handleLoadGroups();
  }, []);

  return (
    <>
      <h1 className="text-center m-3">Groups</h1>
      <Row className="mx-4">
        {groups &&
          groups.map((group) => (
            <Col key={group.id} sm={12} md={6} lg={4} xl={3}>
              <GroupCard item={group} />
            </Col>
          ))}
      </Row>

      <h1 className="text-center m-3">Terminals</h1>
      <Row className="mx-4">
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
