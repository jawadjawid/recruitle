import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AboutPage from './components/AboutPage';
import SignIn from './components/Auth/SignIn';
import SignUpPage from './components/Auth/SignUpPage';
import NavBar from './components/NavBar';
import { getUsername } from './components/api';

export default function BasicExample() { 
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if(getUsername() !== ''){
      setIsSignedIn(true);
    } 
  });

  return (
    <Router>
      <NavBar isSignedIn={isSignedIn}/>
      <Routes>
        <Route path='/signin' element={<SignIn isSignedIn={isSignedIn} />}/>
        <Route path='/signup' element={<SignUpPage isSignedIn={isSignedIn}/>}/>
        <Route path='/profile' element={<AboutPage isSignedIn={isSignedIn}/>}/>
      </Routes>
    </Router>
  );
}
