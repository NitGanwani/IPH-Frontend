import { Button, Form } from 'react-bootstrap';
import FormContainer from '../form/form';
import { useUsers } from '../../hooks/use.users';
import { useNavigate } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { User } from '../../models/user';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleRegisterUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const data = {
      name: (formElement.elements.namedItem('name') as HTMLInputElement).value,
      email: (formElement.elements.namedItem('email') as HTMLInputElement)
        .value,
      password: (formElement.elements.namedItem('password') as HTMLInputElement)
        .value,
    } as Partial<User>;

    if (data.name === '' || data.email === '' || data.password === '') {
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'REGISTER ERROR',
        text: 'Try again please',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'red',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    } else {
      handleRegisterUser(data);
      Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'WELCOME TO IPH DASHBOARD',
        text: 'Redirecting to login process',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'green',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
      formElement.reset();
      navigate('/login');
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
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

export default Register;
