import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import { useUsers } from '../../hooks/use.users';

export function Home() {
  const { loggedUser } = useUsers();

  return (
    <Container className="text-center mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Welcome to the IPH Terminals App</Card.Title>
          {loggedUser ? (
            <>
              <Card.Text>
                Please click on the button below so you can access the
                dashboard.
              </Card.Text>
              <Link to="/dashboard">
                <Button variant="primary">Dashboard</Button>
              </Link>
            </>
          ) : (
            <>
              <Card.Text>
                Please login with your email in order to use the app.
              </Card.Text>
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
