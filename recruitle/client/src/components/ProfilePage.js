import { useQuery } from '@apollo/client';
import { GET_EMPLOYER, GET_APPLICANT } from '../queries/queries';
import { getUsername, getUsertype } from './api.js';
import React from "react";
import { useNavigate } from 'react-router-dom';

export default function ProfilePage(props) {
    const navigate = useNavigate();

    const username = getUsername();
    const userType = getUsertype();

    const { loading, error, data } = useQuery((userType == "applicant" ? GET_APPLICANT : GET_EMPLOYER), {
        variables: { id: username }
    });

    const displayApplicantDetails = () => {   
        if (data && data.applicant) { 
            return (
                <div>
                <h2>{ data.applicant.id }</h2>
                <p>{ data.applicant.firstName }</p>
                <p>{ data.applicant.lastName }</p>
                <p>{ data.applicant.email }</p>
                </div>
            );
        }
    };

    const displayEmployerDetails = () => {
        if (data && data.employer) {
            return (
                <div>
                <h2>{ data.employer.id }</h2>
                <p>{ data.employer.companyName }</p>
                <p>{ data.employer.email }</p>
                </div>
            );
        }
    };

    function authResolver(){
        if (!props.isSignedIn){
            navigate('/')
        } else {
            if (userType == "applicant") {
                return (
                    <div>
                        {displayApplicantDetails()}
                    </div>
                );
            } else {
                return (
                    <div>
                        {displayEmployerDetails()}
                    </div>
                );
            }
        }
      }
    
      return (
        <React.Fragment>
          {authResolver()}
        </React.Fragment>
      );
};