import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { GET_JOBS, RESUME_EXISTS, GET_JOBS_COUNT } from "../../queries/queries";
import { getUsername } from "../api.js";
import JobCard from "./JobCard";
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Pagination from 'react-bootstrap/Pagination';

function JobsPage(props) {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(1);
    const {data: resume, loading: resumeLoading} = useQuery(RESUME_EXISTS, {variables: {id: getUsername()}});
    const {data: jobsCount, loading: jobsCountLoading} = useQuery(GET_JOBS_COUNT, {variables:
         {filter: window.location.href.split("?filter=")[1] }});
    const {data: jobs, loading: jobsLoading, error} = useQuery(GET_JOBS, { 
        variables: { 
            applicantId: getUsername(),
            first: 10,
            offset: (activePage - 1) * 10,
            filter: window.location.href.split("?filter=")[1],
         } 
    });

    const {enqueueSnackbar} = useSnackbar();

    if (jobsLoading || resumeLoading || jobsCountLoading) return (<p>No data</p>);
    if (error) enqueueSnackbar("Couldn't fetch jobs", {variant: 'error'});

    let pages = [];
    for (let number = 1; number <= Math.ceil(jobsCount.jobCount.value/10); number++) {
        pages.push(
            <Pagination.Item key={number} active={number === activePage} onClick={navPage}>
                {number}
            </Pagination.Item>,
        );
    }
    
    function navPage(e){ 
        setActivePage(parseInt(e.currentTarget.text));
    };

    const showJobs = () => {
        if(!props.isSignedIn || props.userType == 'employer') navigate('/');
        return (
            <React.Fragment>
                <Box sx={{
                    columnCount: 1,
                    margin: "auto",
                    marginTop: "20px",
                    width: "70%",
                }}>
                    {jobs.jobs.map(job => (<JobCard job={job} resumeExists={resume.resumeExists} enqueueSnackbar={enqueueSnackbar}></JobCard>))}
                    <Pagination style={{justifyContent:'center'}}>{pages}</Pagination>
                </Box>
            </React.Fragment>
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