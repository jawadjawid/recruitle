import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries/queries';
import { getUsername } from './api.js';
import React, { useEffect, useState } from "react";


export default function ProfilePage() {
    const username = getUsername();
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id: username }
    });

    const displayUserDetails = () => {
        if (data && data.user) {
            return (
                <div>
                <h2>{ data.user.id }</h2>
                <p>{ data.user.firstName }</p>
                <p>{ data.user.lastName }</p>
                <p>{ data.user.email }</p>
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