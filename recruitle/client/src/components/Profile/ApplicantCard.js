import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function ApplicantCard(props) {
    const navigate = useNavigate();
    const [requested, setRequested] = React.useState(false);

    function requestInterview(){
        console.log("hello")
        setRequested(true);
    }

    return(
        <Card sx={{pageBreakInside: "avoid", breakInside: "avoid", marginBottom: "20px"}} variant="outlined">
            <CardContent>
                <Typography variant="h5">{props.app.firstName} {props.app.lastName}</Typography>
                <Typography sx={{mb: 1.5, wordBreak: "break-word"}} style={{whiteSpace: 'pre-line'}} variant="body1">{props.app.email}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={requestInterview} disabled={requested}>Request Interview</Button>
            </CardActions>
        </Card>
    );
}