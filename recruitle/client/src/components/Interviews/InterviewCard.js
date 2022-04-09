import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function InterviewCard(props) {
    function joinRoom(){
        props.setRoomName(props.interview.roomName);
    }

    const name = () => {
        if (props.userType == 'applicant') {
            return props.interview.employerId.companyName;
        } else {
            return props.interview.applicantId.firstName + " " + props.interview.applicantId.lastName
        }
    }

    return(
        <Card sx={{marginBottom: "20px"}} variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" gutterBottom>{name()}</Typography>
                <Typography variant="h5">{props.interview.jobId.title}</Typography>
                <Typography color="text.secondary">{props.interview.date}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={joinRoom}>Join Interview</Button>
            </CardActions>
        </Card>
    );
}