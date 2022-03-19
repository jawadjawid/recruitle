import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signin } from './api.js';
import SnackBarAlert from '../SnackBarAlert';
import Image from '../../media/background.jpg';
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

const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`,
      borderRadius: '0px',
      width: '100%',
      height: 1200,
      minHeight: '100%',
      backgroundSize: 'cover'
    }
};

const theme = createTheme();
export default function SignIn(props) {
  const navigate = useNavigate();
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway')
        return;
    setSnackBarOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signin(data.get('email'), data.get('password'), function(err, user) {
      if (err){
        setSnackBarOpen(true);
        setSnackBarMsg("Sign in fail!");
        setSeverity("error");
      } 
      else {
        setSnackBarOpen(true);
        setSnackBarMsg("Welcome " + (user.firstName ? user.firstName : user.companyName));
        setSeverity("success");
        setTimeout(function(){window.location.href = '/profile';}, 200);
      }
    });
  };

  function authResolver(){
    if (props.isSignedIn){
      navigate('/profile')
    } else {
      return (  
        <Paper style={styles.paperContainer}>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', marginTop: 19 }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box  component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
  
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        <SnackBarAlert open={snackBarOpen} severity={severity} msg={snackBarMsg} handleSnackBarClose={handleSnackBarClose} />
      </ThemeProvider>
      </Paper>
        );
    }
  }

  return (
    <React.Fragment>
      {authResolver()}
    </React.Fragment>
  );
}