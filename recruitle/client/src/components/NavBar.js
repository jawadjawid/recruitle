import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { getUsername } from './api.js';
import { signout } from './Auth/api.js';
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

export default function NavBar(props) { 
  function signoutUser(){ 
    signout(function(err, user) {
      if (err) console.log(err);
      window.location.href = '/';
    })
  };

  function buttons(){
    if (!props.isSignedIn){
      return (      
      <Nav className="me-auto">
        <Nav.Link href="signin">Sign In</Nav.Link>
        <Nav.Link href="signup">Sign Up</Nav.Link>
        <Nav.Link href="credits">Credits</Nav.Link>
      </Nav>
      );
    } else if(props.userType == 'applicant'){
      return (  
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="profile">Profile</Nav.Link>
            <Nav.Link href="credits">Credits</Nav.Link>
          </Nav>
          <Nav>
            <Button className="justify-content-end" variant="text" onClick={signoutUser}> Sign out</Button>
          </Nav>
        </Navbar.Collapse>
        );
    } else if(props.userType == 'employer'){
      return (  
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="profile">Profile</Nav.Link>
            <Nav.Link href="credits">Credits</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="create">Create Job</Nav.Link>
            <Button className="justify-content-end" variant="text" onClick={signoutUser}> Sign out</Button>
          </Nav>
        </Navbar.Collapse>
        );
    }
  }

  return (
    <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand href="/">Recruitle</Navbar.Brand>   
      {buttons()}
      </Container>
    </Navbar>
  );
}
