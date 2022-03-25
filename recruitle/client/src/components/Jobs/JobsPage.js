import { useQuery } from "@apollo/client";
import React from "react";
import Box from '@mui/material/Box';
import { GET_JOBS, RESUME_EXISTS } from "../../queries/queries";
import { getUsername } from "../api.js";
import JobCard from "./JobCard";
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

function JobsPage(props) {
    const navigate = useNavigate();
    const {data: jobs, loading: jobsLoading, error} = useQuery(GET_JOBS, {variables: {applicantId: getUsername()}});
    const {data: resume, loading: resumeLoading} = useQuery(RESUME_EXISTS, {variables: {id: getUsername()}});
    const {enqueueSnackbar} = useSnackbar();

    if (jobsLoading || resumeLoading) return (<p>No data</p>);
    if (error) enqueueSnackbar("Couldn't fetch jobs", {variant: 'error'});

    const showJobs = () => {
        if(!props.isSignedIn || props.userType == 'employer') navigate('/');
        return (
            <Box sx={{
                columnCount: 1,
                margin: "auto",
                marginTop: "20px",
                width: "70%",
            }}>
                {jobs.jobs.map(job => (<JobCard job={job} resumeExists={resume.resumeExists} enqueueSnackbar={enqueueSnackbar}></JobCard>))}
            </Box>
        );
    }

    return showJobs();
}

export default function JobsPageNotistack(props) {
    return (
      <SnackbarProvider maxSnack={3}>
        <JobsPage isSignedIn={props.isSignedIn} userType={props.userType}/>
      </SnackbarProvider>
    );
  }