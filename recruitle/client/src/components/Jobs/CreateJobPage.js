import { useMutation, useQuery } from '@apollo/client';
import { CREATE_JOB, GET_EMPLOYER } from '../../queries/queries';
import { getUsername } from '../api.js';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SnackBarAlert from '../SnackBarAlert';
import MenuItem from '@mui/material/MenuItem';
import { SnackbarProvider, useSnackbar } from 'notistack';

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

function CreateJobPage(props) {
  const navigate = useNavigate();
  const [currency, setCurrency] = React.useState('USD');
  const {enqueueSnackbar} = useSnackbar();
  const {data, loading} = useQuery(GET_EMPLOYER, {variables: {id: getUsername()}});
  const [createJob, {loading: createLoading, error: createError, data: createData, reset}] = useMutation(CREATE_JOB);

  if (loading) return (<p>Loading...</p>);
  if (createError) {
    reset();
    enqueueSnackbar("Failed to post job.", {variant: 'error'});
  } else if (!createLoading && createData?.createJob?.id) {
    reset();
    enqueueSnackbar("Job posted! You will receive an email for any applications.", {variant: 'success'});
  }

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (document.getElementById('title').value == '' || document.getElementById('location').value == '' || document.getElementById('salary').value == ''){
      return;
    }
    const formdata = new FormData(event.currentTarget);
    createJob({ variables: {
      title: formdata.get('title'),
      desc: formdata.get('desc'),
      location: formdata.get('location'),
      salary: parseInt(formdata.get('salary')),
      currency: currency,
      companyName: data.employer.companyName
    }});
    document.getElementById("title").value = '';
    document.getElementById("desc").value = '';
    document.getElementById("location").value = '';
    document.getElementById("salary").value = '';
  };

  function formResolver() {
    if (!props.isSignedIn || props.userType == 'applicant') navigate('/');
    else {
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
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    id="desc"
                    label="Job Description"
                    name="desc"
                    inputProps={{ maxLength: 320 }}
                  />
                  <TextField
                    type="text"
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

export default function CreateJobPageNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <CreateJobPage isSignedIn={props.isSignedIn} userType={props.userType}/>
    </SnackbarProvider>
  );
}