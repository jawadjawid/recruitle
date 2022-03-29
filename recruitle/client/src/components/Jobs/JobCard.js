import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {sendApplication} from './api.js'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function JobCard(props) {
    const [applied, setApplied] = React.useState(false);

    function apply(){
        if(!props.resumeExists) {
            props.enqueueSnackbar("Please upload a resume from your profile to quick apply.", {variant: "warning"});
            return;
        }
        setApplied(true);
        sendApplication(props.job.id, function(err, res) {
            if(err){
                setApplied(false);
                props.enqueueSnackbar("Failed to quick apply, please try again.", {variant: "error"});
            } else {
                props.enqueueSnackbar("Application sent!", {variant: "success"});
            }
        });
    }

    return(
        <Card sx={{pageBreakInside: "avoid", breakInside: "avoid", marginBottom: "20px"}} variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" gutterBottom>{props.job.companyName}</Typography>
                <Typography variant="h5">{props.job.title}</Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary"><LocationOnOutlinedIcon fontSize="small"></LocationOnOutlinedIcon>{props.job.location}</Typography>
                <Typography sx={{mb: 1.5, wordBreak: "break-word"}} style={{whiteSpace: 'pre-line'}} variant="body1">{props.job.desc}</Typography>
                <Typography variant="body2">{props.job.salary} {props.job.currency}/year</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={apply} disabled={props.job.applied || applied}>Quick Apply</Button>
            </CardActions>
        </Card>
    );
}