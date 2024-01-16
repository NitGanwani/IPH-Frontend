import { Col, Row } from 'react-bootstrap';
import { useTerminals } from '../../hooks/use.terminals';
import { TerminalCard } from '../terminals/terminal';
import { useEffect } from 'react';
import { GroupCard } from '../groups/group';
import { useGroups } from '../../hooks/use.groups';
import { useChats } from '../../hooks/use.chats';
import { ChatCard } from '../chats/chat';

export function Dashboard() {
  const { groups, handleLoadGroups } = useGroups();
  const { terminals, handleLoadTerminals } = useTerminals();
  const { chats, handleLoadChats } = useChats();

  useEffect(() => {
    handleLoadTerminals();
    handleLoadGroups();
    handleLoadChats();
  }, []);

  return (
    <>
      <div className="py-4">
        <h1 className="text-center m-3 py-2">Groups</h1>
        <Row className="mx-4">
          {groups &&
            groups.map((group) => (
              <Col key={group.id} sm={12} md={6} lg={4} xl={3}>
                <GroupCard item={group} />
              </Col>
            ))}
        </Row>
      </div>

      <div className="py-4">
        <h1 className="text-center m-3 py-2">Terminals</h1>
        <Row className="mx-4">
          {terminals &&
            terminals.map((terminal) => (
              <Col key={terminal.id} sm={12} md={6} lg={4} xl={3}>
                <TerminalCard item={terminal} />
              </Col>
            ))}
        </Row>
      </div>

      <div className="py-4">
        <h1 className="text-center m-3 py-2">Chats</h1>
        <Row className="mx-4">
          <div className="d-flex justify-content-center">
            {chats &&
              chats.map((chat) => (
                <Col key={chat.id} sm={12} md={6} lg={4} xl={3}>
                  <ChatCard item={chat} />
                </Col>
              ))}
          </div>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
