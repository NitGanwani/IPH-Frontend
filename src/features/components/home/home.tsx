import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';

export function Home() {
  return (
    <Container className="text-center mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Welcome to the IPH Terminals App</Card.Title>
          <Card.Text>
            Please login with your email in order to use the app.
          </Card.Text>
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
