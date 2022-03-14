import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { getUsername } from './api.js';
import React, { useEffect, useState } from "react";

export default function NavBar() { 
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if(getUsername() != ''){
      setIsSignedIn(true);
    } 
  });

  function routes(){
    if (isSignedIn){
      return (      
      <Nav className="me-auto">
        <Nav.Link href="employer">Employer</Nav.Link>
        <Nav.Link href="signin">Sign In</Nav.Link>
        <Nav.Link href="signup">Sign Up</Nav.Link>
      </Nav>
      );
    } else {
      return (      
        <Nav className="me-auto">
          <Nav.Link href="employer">ass</Nav.Link>
          <Nav.Link href="signin">Hey</Nav.Link>
          <Nav.Link href="signup">Hey Up</Nav.Link>
        </Nav>
        );
    }
  }

  return (
    <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand href="/">Recruitle</Navbar.Brand>   
      {routes()}
      </Container>
    </Navbar>
  );
}
