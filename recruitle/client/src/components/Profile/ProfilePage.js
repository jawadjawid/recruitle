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

import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYER, GET_APPLICANT, UPDATE_APPLICANT, UPDATE_EMPLOYER } from '../../queries/queries';
import { getUsername, getUsertype } from '../api.js';
import { uploadResume } from './api.js';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href={"https://recruitle.me/"}>
        Recruitle
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();

export default function ProfilePage(props) {
    const navigate = useNavigate();

    const inputRef = useRef();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const username = getUsername();
    const userType = getUsertype();

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    const [updateUserMutation, { data2, loading2, error2 }] = useMutation((userType == "applicant" ? UPDATE_APPLICANT : UPDATE_EMPLOYER))

    const {loading, error, data} = useQuery((userType == "applicant" ? GET_APPLICANT : GET_EMPLOYER), { 
        variables: { id: username } 
    });

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
        uploadResume(file, function(err, res) {
            if (err){
                setSnackBarOpen(true);
                setSnackBarMsg("Resume upload fail!");
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
        if (data && data.applicant) { 
            return (
                <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <img className="edit-icon" alt="Edit" style={{height:22, width:22}} src="https://upload.wikimedia.org/wikipedia/en/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg"/>
                    <Typography component="h1" variant="h2" sx={{marginBottom: 5}}>
                            <Editable
                                text={firstName}
                                placeholder={data.applicant.firstName}
                                childRef={inputRef}
                                type="input"
                            >
                                <input
                                ref={inputRef}
                                type="text"
                                name="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                                placeholder={data.applicant.firstName}
                                value={firstName}
                                onChange={handleFirstNameChange}
                                />
                        </Editable>
                    </Typography>
                    <img className="edit-icon" alt="Edit" style={{height:22, width:22}} src="https://upload.wikimedia.org/wikipedia/en/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg"/>
                    <Typography component="h1" variant="h2">
                        <Editable
                                text={lastName}
                                placeholder={data.applicant.lastName}
                                childRef={inputRef}
                                type="input"
                            >
                                <input
                                ref={inputRef}
                                type="text"
                                name="lastName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                                placeholder={data.applicant.lastName}
                                value={lastName}
                                onChange={handleLastNameChange}
                                />
                        </Editable>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <img className="email-icon" alt="Email" style={{height:35, width:35}} src="https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Mail-512.png"/>
                                  {data.applicant.email}
                            </Grid>
                            <Grid item xs={12}>
                                <img className="resume-icon" alt="Resume" style={{height:35, width:35}} src="https://www.clipartmax.com/png/small/308-3085721_resume-png-clipart-my-resume-icon-png.png"/>
                                {data.applicant.resume.originalname}
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
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
                <SnackBarAlert open={snackBarOpen} severity={severity} msg={snackBarMsg} handleSnackBarClose={handleSnackBarClose} />
                </ThemeProvider>
            );
        }
    };

    const DisplayEmployerDetails = () => {  
        if (data && data.employer) { 
            return (
                <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
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
                        {data.employer.companyName}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <img className="email-icon" alt="Email" style={{height:35, width:35}} src="https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Mail-512.png"/>
                                  {data.employer.email}
                            </Grid>
                        </Grid>
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
            if (userType == "applicant") {
                return (
                    <div>
                        {DisplayApplicantDetails()}
                    </div>
                );
            } else {
                return (
                    <div>
                        {DisplayEmployerDetails()}
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
}