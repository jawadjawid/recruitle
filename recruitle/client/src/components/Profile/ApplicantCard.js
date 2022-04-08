import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import { getUsername } from "../api";
import { useMutation } from '@apollo/client';
import { REQUEST_INTERVIEW } from "../../queries/queries";

export default function ApplicantCard(props) {
    const navigate = useNavigate();
    const [requested, setRequested] = React.useState(false);
    const [interview, {loading, error, data}] = useMutation(REQUEST_INTERVIEW);

    const [date, setDate] = React.useState(new Date());

    const handleChange = (newDate) => {
      setDate(newDate);
    };

    function requestInterview(){
        setRequested(true);
        interview({variables: {
            employerId: getUsername(),
            applicantId: props.app.id,
            jobId: props.jobId,
            date: date.toLocaleString()
        }});
    }

    return(
        <Card sx={{pageBreakInside: "avoid", breakInside: "avoid", marginBottom: "20px"}} variant="outlined">
            <CardContent>
                <Typography variant="h5">{props.app.firstName} {props.app.lastName}</Typography>
                <Typography sx={{mb: 1.5, wordBreak: "break-word"}} style={{whiteSpace: 'pre-line'}} variant="body1">{props.app.email}</Typography>
            </CardContent>
            <CardActions>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DateTimePicker
                        id="date"
                        label="Interview Date"
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button onClick={requestInterview} disabled={requested}>Request Interview</Button>
            </CardActions>
        </Card>
    );
}