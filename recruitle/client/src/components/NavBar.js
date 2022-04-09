import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { signout } from './Auth/api.js';
import Button from '@mui/material/Button';
import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function NavBar(props) { 
  let [searchParams, setSearchParams] = useSearchParams();
  let [isJobsPage, setIsJobsPage] = useState(window.location.href.includes("/jobs"));

  function signoutUser(){ 
    signout(function(err, user) {
      if (err) console.log(err);
      window.location.href = '/';
    })
  };

  function search(e){ 
    e.preventDefault();
    setSearchParams({"filter": e.target.children[0].value});
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
            <Nav.Link href="https://recruitle.me/interviews">Interviews</Nav.Link>
            <Nav.Link href="https://recruitle.me/jobs" replace={true}>Jobs</Nav.Link>
            <Nav.Link href="https://recruitle.me/profile" replace={true}>Profile</Nav.Link>
            <Nav.Link href="https://recruitle.me/credits" replace={true}>Credits</Nav.Link>
          </Nav>
          <Nav>
            {isJobsPage && <Form onSubmit={search} className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>}

            <Button className="justify-content-end" variant="text" onClick={signoutUser}> Sign out</Button>
          </Nav>
        </Navbar.Collapse>
        );
    } else if(props.userType == 'employer'){
      return (  
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="https://recruitle.me/interviews">Interviews</Nav.Link>
            <Nav.Link href="https://recruitle.me/profile" replace={true}>Profile</Nav.Link>
            <Nav.Link href="https://recruitle.me/credits" replace={true}>Credits</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://recruitle.me/create" replace={true}>Create Job</Nav.Link>
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
