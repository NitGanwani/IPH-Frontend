import {
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  NavDropdown,
} from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { LinkContainer } from 'react-router-bootstrap';
import { useUsers } from '../../hooks/use.users';
import logo from '../../../../src/assets/logo.png';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { loggedUser, logout } = useUsers();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <NavbarBrand>
              <img src={logo} alt="iph-logo" width={100} height={75} />
            </NavbarBrand>
          </LinkContainer>
          <NavbarToggle aria-controls="basic-navbar-nav"></NavbarToggle>
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {loggedUser && (
                <NavDropdown title={loggedUser.name} id="username">
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {loggedUser && loggedUser.role === 'Admin' && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productslist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
