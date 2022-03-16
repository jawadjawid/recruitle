import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AboutPage from './components/AboutPage';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import SignUpPage from './components/Auth/SignUpPage';
import NavBar from './components/NavBar';

export default function BasicExample() { 
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='/profile' element={<AboutPage />}/>
      </Routes>
    </Router>
  );
}
