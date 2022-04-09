import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SnackBarAlert from '../SnackBarAlert';
import Editable from "./Editable";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import ApplicationCard from "./ApplicationCard";
import Pagination from 'react-bootstrap/Pagination';

import { useQuery, useMutation } from '@apollo/client';
import { GET_APPLICANT, UPDATE_APPLICANT, GET_APPLICATIONS, GET_APPLICATIONS_COUNT } from '../../queries/queries';
import { getUsername } from '../api.js';
import { uploadResume } from './api.js';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://recruitle.me/">
        Recruitle
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const theme = createTheme();

export default function ApplicantProfilePage(props) {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(1);

    const inputRef = useRef();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const username = getUsername();

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    const [updateUserMutation, { data: updateData, loading: updateLoading }] = useMutation(UPDATE_APPLICANT);

    const {loading: applicantLoading, error, data: applicantData} = useQuery(GET_APPLICANT, { 
        variables: { id: username } 
    });

    const {data: appsData, loading: appsLoading} = useQuery(GET_APPLICATIONS, {
        variables: {
            applicantId: getUsername(),
            first: 5,
            offset: (activePage - 1) * 5,
        }
    });

    const {data: appsCountData, loading: appsCountLoading} = useQuery(GET_APPLICATIONS_COUNT, {
        variables: {applicantId: getUsername()}
    });

    if (error) {
        setSnackBarOpen(true);
        setSnackBarMsg("Failed to load user profile data.");
        setSeverity("error");
    }
    let pages = [];
    if (appsCountData) {
        for (let number = 1; number <= Math.ceil(appsCountData.applicationsCount.value/5); number++) {
            pages.push(
                <Pagination.Item key={number} active={number === activePage} onClick={navPage}>
                    {number}
                </Pagination.Item>,
            );
        }
    }
    
    function navPage(e){ 
        setActivePage(parseInt(e.currentTarget.text));
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setSnackBarOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const files = event.target.resume_url.files;
        const file = files[0]
        event.target.reset();
        if (file == null) {
            setSnackBarOpen(true);
            setSnackBarMsg("Resume upload fail. Ensure you've attached a resume!");
            setSeverity("error");
        }
        uploadResume(file, function(err, res) {
            if (err){
                setSnackBarOpen(true);
                setSnackBarMsg("Resume upload fail. Ensure you've attached a resume!");
                setSeverity("error");
            } 
            else {
                setSnackBarOpen(true);
                setSnackBarMsg("Resume uploaded!");
                setSeverity("success");
                setTimeout(function(){window.location.href = '/profile';}, 200);
            }
        })
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
        updateUserMutation({
            variables: { id: username, firstName: e.target.value},
        });
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
        updateUserMutation({
            variables: { id: username, lastName: e.target.value},
        });
    }

    const DisplayApplicantDetails = () => {  
        if (appsData && appsCountData && applicantData) {
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
                    <EditIcon color="primary" fontSize="large"/>
                    <Typography component="h1" variant="h2" sx={{marginBottom: 5}}>
                            <Editable
                                text={firstName}
                                placeholder={applicantData.applicant.firstName}
                                childRef={inputRef}
                                type="input"
                            >
                                <input
                                ref={inputRef}
                                type="text"
                                name="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                                placeholder={applicantData.applicant.firstName}
                                value={firstName || applicantData.applicant.firstName}
                                onChange={handleFirstNameChange}
                                />
                        </Editable>
                    </Typography>
                    <EditIcon color="primary" fontSize="large"/>
                    <Typography component="h1" variant="h2">
                        <Editable
                                text={lastName}
                                placeholder={applicantData.applicant.lastName}
                                childRef={inputRef}
                                type="input"
                            >
                                <input
                                ref={inputRef}
                                type="text"
                                name="lastName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                                placeholder={applicantData.applicant.lastName}
                                value={lastName ||applicantData.applicant.lastName}
                                onChange={handleLastNameChange}
                                />
                        </Editable>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <EmailIcon color="primary" fontSize="large"/>
                                {applicantData.applicant.email}
                            </Grid>
                            <Grid item xs={12}>
                                <ContactPageIcon color="primary" fontSize="large"/>
                                {applicantData.applicant.resume.originalname}
                            </Grid>
                            <Grid item xs={12}>
                                <input type="file" id="resume_url" name="resume_irl" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf" required/>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Upload Resume
                        </Button>
                    </Box>
                    <Typography component="h1" variant="h2" sx={{marginTop:5, width:"max-content"}}>
                        Your Job Applications
                    </Typography>
                    <Box sx={{
                        columnCount: 1,
                        margin: "auto",
                        marginTop: "20px",
                        width: "100%",
                    }}>
                        {appsData.applications.map(app => (<ApplicationCard app={app} hideApplicants={true}></ApplicationCard>))}
                        <Pagination style={{justifyContent:'center'}}>{pages}</Pagination>
                    </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
                <SnackBarAlert open={snackBarOpen} severity={severity} msg={snackBarMsg} handleSnackBarClose={handleSnackBarClose} />
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
                    {DisplayApplicantDetails()}
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