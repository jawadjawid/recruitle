import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from "react";

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  export default function SnackBarAlert(props) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleSnackBarClose}>
            <Alert onClose={props.handleSnackBarClose} severity={props.severity} sx={{ width: '100%' }}>
                {props.msg}
            </Alert>
        </Snackbar>
    );
}