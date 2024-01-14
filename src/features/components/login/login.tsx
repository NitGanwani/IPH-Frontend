import { SyntheticEvent, useEffect, useState } from 'react';
import FormContainer from '../form/form';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import Swal from 'sweetalert2';

export function Login() {
  const [hasLogin, setHasLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useUsers();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLFormElement;
    const loggedUser = {
      email: (element.elements.namedItem('email') as HTMLInputElement).value,
      password: (element.elements.namedItem('password') as HTMLInputElement)
        .value,
    };
    login(loggedUser);
  };

  useEffect(() => {
    if (hasLogin) {
      Swal.fire({
        icon: 'success',
        title: '¡Login correcto!',
        showConfirmButton: false,
        timer: 1500,
        width: 350,
      }).then(() => {
        setHasLogin(false);
        navigate('/home/');
      });
    }
  }, [hasLogin]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Login;
