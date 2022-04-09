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
import CreateJobPageNotistack from './components/Jobs/CreateJobPage';
import JobsPageNotistack from "./components/Jobs/JobsPage";
import ProfilePage from './components/Profile/ProfilePage';
import SignIn from './components/Auth/SignIn';
import SignUpPage from './components/Auth/SignUpPage';
import NavBar from './components/NavBar';
import CreditsPage from './components/CreditsPage';
import { getUsername, getUsertype } from './components/api';
import ListApplicantsPage from "./components/Profile/ListApplicantsPage";
import InterviewsPage from './components/Interviews/InterviewsPage';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

export default function BasicExample() { 
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userType, setUserType] = useState(false);

  useEffect(() => {
    if(getUsername() !== ''){
      setIsSignedIn(true);
    }
    if(getUsertype() !== ''){
      setUserType(getUsertype());
    }
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar isSignedIn={isSignedIn} userType={userType}/>
        <Routes>
          <Route path='/' element={<SignIn isSignedIn={isSignedIn} />}/>
          <Route path='/signin' element={<SignIn isSignedIn={isSignedIn} />}/>
          <Route path='/signup' element={<SignUpPage isSignedIn={isSignedIn}/>}/>
          <Route path='/profile' element={<ProfilePage isSignedIn={isSignedIn} userType={userType}/>}/>
          <Route path='/create' element={<CreateJobPageNotistack isSignedIn={isSignedIn} userType={userType}/>}/>
          <Route path='/jobs' element={<JobsPageNotistack isSignedIn={isSignedIn} userType={userType}/>}/>
          <Route path='/interviews' element={<InterviewsPage isSignedIn={isSignedIn} userType={userType}/>}/>
          <Route path='/applicants/:jobId' element={<ListApplicantsPage isSignedIn={isSignedIn} />} />
          <Route path='/credits' element={<CreditsPage/>}/>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
