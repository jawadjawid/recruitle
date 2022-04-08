import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import ApplicationCard from "./ApplicationCard";
import Pagination from 'react-bootstrap/Pagination';

import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYER, UPDATE_EMPLOYER, GET_APPLICANTS, GET_POSTINGS } from '../../queries/queries';
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

export default function EmployerProfilePage(props) {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(1);

    const username = getUsername();

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    const [updateUserMutation, { data: updateData, loading: updateLoading }] = useMutation(UPDATE_EMPLOYER)

    const {loading: employerLoading, error, data: employerData} = useQuery(GET_EMPLOYER, { 
        variables: { id: username } 
    });

    if (updateLoading || employerLoading ) return (<p>No data</p>);
    if (error) {
        setSnackBarOpen(true);
        setSnackBarMsg("Failed to load user profile data.");
        setSeverity("error");
    }
    // let pages = [];
    // if (appsCountData) {
    //     for (let number = 1; number <= Math.ceil(appsCountData.applicationsCount.value/5); number++) {
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

    const DisplayEmployerDetails = () => {  
        if (employerData && employerData.employer) { 
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
                        {employerData.employer.companyName}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <EmailIcon color="primary" fontSize="large"/>
                                {employerData.employer.email}
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography component="h1" variant="h2" sx={{marginTop:5, width:"max-content"}}>
                        Your Job Postings
                    </Typography>
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
                    {DisplayEmployerDetails()}
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