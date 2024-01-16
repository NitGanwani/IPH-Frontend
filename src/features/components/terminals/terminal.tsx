import { Button, Card } from 'react-bootstrap';
import { Terminal } from '../../models/terminal';
import { Link } from 'react-router-dom';
import { useTerminals } from '../../hooks/use.terminals';
import style from './terminal.module.scss';
import { useUsers } from '../../hooks/use.users';

type PropsType = {
  item: Terminal;
};

export function TerminalCard({ item }: PropsType) {
  const { handleDeleteTerminal } = useTerminals();
  const { loggedUser } = useUsers();

  return (
    <Card className={style.card}>
      <Card.Body className="text-center">
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <strong>Battery:</strong> {item.battery}%
          <br />
          <strong>Wifi Level:</strong> {item.wifi}
          <br />
          <strong>Is Connected:</strong> {item.isConnected}
          <br />
          <strong>Group:</strong> {item.group.name}
        </Card.Text>
        {loggedUser && loggedUser.role === 'Admin' && (
          <div className="d-flex justify-content-center mt-3">
            <Link to={`/create-terminal/${item.id}`}>
              <Button variant="primary" className="mx-2">
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              className="mx-2"
              onClick={() => handleDeleteTerminal(item.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
