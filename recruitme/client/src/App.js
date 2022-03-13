import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AboutPage from './components/AboutPage';
import SignUp from './components/Auth/SignUp';
import NavBar from './components/NavBar';

export default function BasicExample() {
  
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/employer' element={<AboutPage />}/>
        <Route path='/signin' element={<AboutPage />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </Router>
  );
}
