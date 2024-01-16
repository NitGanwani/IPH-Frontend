import { Card } from 'react-bootstrap';
import { Chat } from '../../models/chat';
import { RxCheck, RxCross2 } from 'react-icons/rx';

type PropsType = {
  item: Chat;
};

export function ChatCard({ item }: PropsType) {
  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          Number of participants: {item.participants.length}
        </Card.Text>
        {item.isActive ? (
          <>
            <RxCheck />
            <span className="mx-2">Active Chat</span>
          </>
        ) : (
          <>
            <RxCross2 />
            <span className="mx-2">Inactive Chat</span>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
