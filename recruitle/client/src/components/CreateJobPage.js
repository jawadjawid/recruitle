import { useMutation, useQuery } from '@apollo/client';
import { CREATE_JOB } from '../queries/queries';
import { getUsername, getUsertype } from './api.js';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SnackBarAlert from './SnackBarAlert';
import MenuItem from '@mui/material/MenuItem';

const styles = {
  paperContainer: {
    borderRadius: '0px',
    width: '100%',
    height: 1200,
    minHeight: '100%',
    backgroundSize: 'cover'
  }
};


const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const theme = createTheme();

export default function CreateJobPage(props) {
  const navigate = useNavigate();

  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const [currency, setCurrency] = React.useState('USD');

  const [createJob, { data, loading, error }] = useMutation(CREATE_JOB)

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway')
      return;
    setSnackBarOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (document.getElementById('title').value == '' || document.getElementById('location').value == '' || document.getElementById('salary').value == ''){
      setSnackBarOpen(true);
      setSnackBarMsg("Missing required field");
      setSeverity("error");
      return;
    }
    const data = new FormData(event.currentTarget);
    createJob({ variables: {
      title: data.get('title'),
      location: data.get('location'),
      salary: parseInt(data.get('salary')),
      currency: currency,
      companyName: getUsername()
    }});
    setSnackBarOpen(true);
    setSnackBarMsg("Job posted! You will recieve an email for any applications.");
    setSeverity("success");
    document.getElementById("title").value = '';
    document.getElementById("location").value = '';
    document.getElementById("salary").value = '';
  };

  function formResolver() {
    if (!props.isSignedIn || props.userType == 'applicant') {
      navigate(-1);
    } else {
      return (
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '100px'
                }}
              >
                <Typography component="h1" variant="h5">
                  Create Job
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Job Title"
                    name="title"
                    autoFocus
                  />
                  <TextField
                    type=""
                    margin="normal"
                    required
                    fullWidth
                    name="location"
                    label="Location"
                    id="location"
                  />
                  <Box id="salaryContainer" sx={{display: 'flex', flexDirection: 'row', justifyItems: 'center'}}>
                    <TextField
                      sx={{width: "100px", paddingRight: "10px"}}
                      margin="normal"
                      id="currency"
                      required
                      select
                      label={currency}
                      value={currency}
                      onChange={handleCurrencyChange}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      type="number"
                      margin="normal"
                      required
                      fullWidth
                      name="salary"
                      label={"Salary (" + currency + "/year)"}
                      id="salary"
                    />
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Post Job
                  </Button>
                </Box>
              </Box>
            </Container>
            <SnackBarAlert open={snackBarOpen} severity={severity} msg={snackBarMsg} handleSnackBarClose={handleSnackBarClose} />
          </ThemeProvider>
      );
    }
  }

  return (
    <React.Fragment sx={{margin: 1}}>
      {formResolver()}
    </React.Fragment>
  );
};