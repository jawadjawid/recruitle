import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
//import  from 'react-router-dom';
import AboutPage from './AboutPage';
import App from '../App';

export default function NavMenu() {
  return(
    <Router>
        <Routes>
            <Route path='/about' component={AboutPage}/>
        </Routes>
    </Router>
  )
}