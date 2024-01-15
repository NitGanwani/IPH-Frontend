import { Button, Card } from 'react-bootstrap';
import { Group } from '../../models/group';
import { useNavigate } from 'react-router-dom';
import style from './group.module.scss';

type PropsType = {
  item: Group;
};

export function GroupCard({ item }: PropsType) {
  const navigate = useNavigate();

  const handleGroupClick = () => {
    navigate(`/group-terminals/${item.id}`);
  };

  return (
    <Card className={style.card}>
      <Card.Body className="text-center">
        <Card.Title>{item.name}</Card.Title>
        <Button variant="primary" onClick={handleGroupClick}>
          View Terminals
        </Button>
      </Card.Body>
    </Card>
  );
}
