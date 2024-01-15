import { SyntheticEvent, useEffect, useState } from 'react';
import FormContainer from '../form/form';
import { Form, Button } from 'react-bootstrap';
import { useUsers } from '../../hooks/use.users';
import Swal from 'sweetalert2';
import { LoginUser } from '../../models/user';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { login, loginLoadState } = useUsers();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLFormElement;
    const loginUSer: LoginUser = {
      email: (element.elements.namedItem('email') as HTMLInputElement).value,
      password: (element.elements.namedItem('password') as HTMLInputElement)
        .value,
    };
    await login(loginUSer);
    element.reset();
  };

  useEffect(() => {
    if (loginLoadState === 'error') {
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'ERROR',
        text: 'INVALID USERNAME OR PASSWORD',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'red',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
      return;
    }
    if (loginLoadState === 'success') {
      Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'LOGIN SUCCESS!',
        text: 'Redirecting to the dashboard',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'green',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
      navigate('/dashboard');
    }
  }, [loginLoadState, navigate]);

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
        <Button type="submit" variant="dark" className="mt-2">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Login;
