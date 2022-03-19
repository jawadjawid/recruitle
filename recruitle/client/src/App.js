import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProfilePage from './components/ProfilePage';
import SignIn from './components/Auth/SignIn';
import SignUpPage from './components/Auth/SignUpPage';
import NavBar from './components/NavBar';
import CreditsPage from './components/CreditsPage';
import { getUsername } from './components/api';

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql',
  cache: new InMemoryCache()
});

export default function BasicExample() { 
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if(getUsername() !== ''){
      setIsSignedIn(true);
    } 
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar isSignedIn={isSignedIn}/>
        <Routes>
          <Route path='/' element={<SignIn isSignedIn={isSignedIn} />}/>
          <Route path='/signin' element={<SignIn isSignedIn={isSignedIn} />}/>
          <Route path='/signup' element={<SignUpPage isSignedIn={isSignedIn}/>}/>
          <Route path='/profile' element={<ProfilePage isSignedIn={isSignedIn}/>}/>
          <Route path='/credits' element={<CreditsPage/>}/>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
