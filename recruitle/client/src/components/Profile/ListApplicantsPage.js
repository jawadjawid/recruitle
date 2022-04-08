import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApplicantCard from "./ApplicantCard";
import Pagination from 'react-bootstrap/Pagination';

import { useQuery } from '@apollo/client';
import { GET_APPLICANTS, GET_APPLICANTS_COUNT } from '../../queries/queries';
import { getUsername} from '../api.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://localhost:3000/">
        Recruitle
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();

export default function ListApplicantsPage(props) {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(1);

    const username = getUsername();

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    const {data: appsData, loading: appsLoading, error} = useQuery(GET_APPLICANTS, {
        variables: {
            jobId: "624f34d781fede4dd48f4b6e",
            // first: 5,
            // offset: (activePage - 1) * 5,
        }
    });

    // const {data: postingsCountData, loading: postingsCountLoading} = useQuery(GET_POSTINGS_COUNT, {
    //     variables: {companyId: username}
    // });

    if (error) {
        setSnackBarOpen(true);
        setSnackBarMsg("Failed to load user profile data.");
        setSeverity("error");
    }
    // let pages = [];
    // if (postingsCountData) {
    //     for (let number = 1; number <= Math.ceil(postingsCountData.postingsCount.value/5); number++) {
    //         pages.push(
    //             <Pagination.Item key={number} active={number === activePage} onClick={navPage}>
    //                 {number}
    //             </Pagination.Item>,
    //         );
    //     }
    // }
    
    // function navPage(e){ 
    //     setActivePage(parseInt(e.currentTarget.text));
    // };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setSnackBarOpen(false);
    };

    const DisplayApplicants = () => {  
        if (appsData) { 
            return (
                <ThemeProvider theme={theme}>
                <Container component="main">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Typography component="h1" variant="h2">
                        Applicants
                    </Typography>
                    <Box sx={{
                        columnCount: 1,
                        margin: "auto",
                        marginTop: "20px",
                        width: "100%",
                    }}>
                        {appsData.applicants.map(app => (<ApplicantCard app={app}></ApplicantCard>))}
                        {/* <Pagination style={{justifyContent:'center'}}>{pages}</Pagination> */}
                    </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
                </ThemeProvider>
            );
        }
    };

    function authResolver(){
        if (!props.isSignedIn) {
            navigate('/')
        } else {
            return (
                <div>
                    {DisplayApplicants()}
                </div>
            );
        }
    }
    
    return (
        <React.Fragment>
            {authResolver()}
        </React.Fragment>
    );
}