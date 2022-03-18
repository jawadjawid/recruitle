import React, { useEffect, useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import SignUp from './SignUp';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function SignUpPage(props) {
    const [signUpType, setSignUpType] = useState("applicant");

    function flipSignUpType(){ 
       if(signUpType == "applicant"){
        setSignUpType("employer")
       }else{
        setSignUpType("applicant")
       }
    };

    function authResolver(){
      if (props.isSignedIn){
        window.location.href = '/';
      } else {
        return (  
          <React.Fragment>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >   
              <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
                  Sign up
              </Typography>
              <ToggleButtonGroup
                  color="primary"
                  value={signUpType}
                  exclusive
                  onChange={flipSignUpType}
              >
                  <ToggleButton value="applicant">Applicant</ToggleButton>
                  <ToggleButton value="employer">Employer</ToggleButton>
              </ToggleButtonGroup>
          </Box>
          <SignUp userType={signUpType}/>
      </React.Fragment>
          );
      }
    }

  return (
    <React.Fragment>
      {authResolver()}
    </React.Fragment>
  );
}
