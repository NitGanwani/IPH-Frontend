import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGroups } from '../../hooks/use.groups';
import { useTerminals } from '../../hooks/use.terminals';
import { useEffect } from 'react';
import { TerminalCard } from '../terminals/terminal';
import { Col, Row } from 'react-bootstrap';

export function GroupTerminals() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { groups, handleLoadGroups } = useGroups();
  const { terminals, handleLoadTerminals } = useTerminals();

  useEffect(() => {
    handleLoadGroups();
    handleLoadTerminals();
  }, []);

  const selectedGroup = groups.find((group) => group.id === id);

  if (!selectedGroup) {
    navigate('/dashboard');
    return null;
  }

  const groupTerminals = terminals.filter(
    (terminal) => terminal.group.id === selectedGroup.id
  );

  return (
    <>
      <div className="flex-grow-1">
        <h1 className="text-center m-3">{selectedGroup.name} Terminals</h1>
        <div className="d-flex justify-content-center">
          <Link to="/dashboard" className="btn btn-dark my-3 mx-2">
            Go Back
          </Link>
        </div>
        <Row className="mx-4">
          {groupTerminals.map((terminal) => (
            <Col key={terminal.id} sm={12} md={6} lg={4} xl={3}>
              <TerminalCard key={terminal.id} item={terminal} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default GroupTerminals;
