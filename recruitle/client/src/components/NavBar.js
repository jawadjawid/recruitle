import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function NavBar() { 
  return (
    <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand href="/">Recruitle</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="employer">Employer</Nav.Link>
        <Nav.Link href="signin">Sign In</Nav.Link>
        <Nav.Link href="signup">Sign Up</Nav.Link>
        <Nav.Link href="profile">Profile</Nav.Link>
      </Nav>
      </Container>
  </Navbar>
  );
}
