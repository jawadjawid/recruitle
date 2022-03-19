import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries/queries';
import { getUsername } from './api.js';
import React from "react";

export default function ProfilePage() {
    const username = getUsername();
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id: username }
    });

    const displayUserDetails = () => {
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

    return (
        <div>
            {displayUserDetails()}
        </div>
    );
};