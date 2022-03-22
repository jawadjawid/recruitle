import { useQuery } from "@apollo/client";
import React from "react";
import Box from '@mui/material/Box';
import { GET_JOBS } from "../../queries/queries";
import JobCard from "./JobCard";
import { useNavigate } from 'react-router-dom';

export default function JobsPage(props) {
    const navigate = useNavigate();
    const {data, loading, error} = useQuery(GET_JOBS);

    const showJobs = () => {
        if(!props.isSignedIn || props.userType != 'applicant') navigate('/');
        if (loading) return (<p>No data</p>);
        else return (
            <Box sx={{
                columnCount: 3,
                margin: "auto",
                marginTop: "20px",
                width: "70%",
            }}>
                {data.jobs.map(job => (<JobCard job={job}></JobCard>))}
            </Box>
        );
    }

    return showJobs();
}