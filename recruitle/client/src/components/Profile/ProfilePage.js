import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useQuery } from '@apollo/client';
import { GET_EMPLOYER, GET_APPLICANT } from '../../queries/queries';
import { getUsername, getUsertype } from '../api.js';
import { uploadResume } from './api.js';
import { useNavigate } from 'react-router-dom';


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

export default function ProfilePage(props) {
    const navigate = useNavigate();

    const username = getUsername();
    const userType = getUsertype();

    const { loading, error, data } = useQuery((userType == "applicant" ? GET_APPLICANT : GET_EMPLOYER), {
        variables: { id: username }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const files = event.target.resume_url.files;
        const file = files[0]
        event.target.reset();
        uploadResume(file, function(err, res) {
            console.log(res);
        })
    };

    const displayApplicantDetails = () => {   
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
                    <Typography component="h1" variant="h2">
                        {data.applicant.firstName} {data.applicant.lastName}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                        {displayApplicantDetails()}
                    </div>
                );
            } else {
                return (
                    <div>
                        {displayApplicantDetails()}
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

// export default function ProfilePage(props) {
//     const navigate = useNavigate();

//     const username = getUsername();
//     const userType = getUsertype();

//     const { loading, error, data } = useQuery((userType == "applicant" ? GET_APPLICANT : GET_EMPLOYER), {
//         variables: { id: username }
//     });

//     const displayApplicantDetails = () => {   
//         if (data && data.applicant) { 
//             return (
//                 <div>
//                 <h2>{ data.applicant.id }</h2>
//                 <p>{ data.applicant.firstName }</p>
//                 <p>{ data.applicant.lastName }</p>
//                 <p>{ data.applicant.email }</p>
//                 <input type="file" id="image_url" class="form_element" name="image_url" accept="image/*" required/>
//                 </div>
//             );
//         }
//     };

//     const displayEmployerDetails = () => {
//         if (data && data.employer) {
//             return (
//                 <div>
//                 <h2>{ data.employer.id }</h2>
//                 <p>{ data.employer.companyName }</p>
//                 <p>{ data.employer.email }</p>
//                 <input type="file" id="image_url" class="form_element" name="image_url" accept="image/*" required/>
//                 </div>
//             );
//         }
//     };

//     function authResolver(){
//         if (!props.isSignedIn) {
//             navigate('/')
//         } else {
//             if (userType == "applicant") {
//                 return (
//                     <div>
//                         {displayApplicantDetails()}
//                     </div>
//                 );
//             } else {
//                 return (
//                     <div>
//                         {displayEmployerDetails()}
//                     </div>
//                 );
//             }
//         }
//     }
    
//     return (
//         <React.Fragment>
//             {authResolver()}
//         </React.Fragment>
//     );
// };