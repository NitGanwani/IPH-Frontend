import { Button, Card, ProgressBar } from 'react-bootstrap';
import { Terminal } from '../../models/terminal';
import { Link } from 'react-router-dom';
import { useTerminals } from '../../hooks/use.terminals';
import style from './terminal.module.scss';
import { useUsers } from '../../hooks/use.users';
import Swal from 'sweetalert2';

type PropsType = {
  item: Terminal;
};

export function TerminalCard({ item }: PropsType) {
  const { handleDeleteTerminal } = useTerminals();
  const { loggedUser } = useUsers();

  const handleDelete = (id: string) => {
    handleDeleteTerminal(id);
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'TERMINAL DELETED',
      background: 'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
      color: 'white',
      iconColor: 'red',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const getProgressBarVariant = (battery: number): string => {
    if (battery <= 33) {
      return 'danger';
    } else if (battery <= 66) {
      return 'warning';
    } else {
      return 'success';
    }
  };

  return (
    <Card className={style.card}>
      <Card.Body className="text-center">
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <strong>Battery:</strong>
          <ProgressBar
            now={item.battery}
            label={`${item.battery}%`}
            variant={getProgressBarVariant(item.battery)}
            className="mt-3"
          />
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
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
