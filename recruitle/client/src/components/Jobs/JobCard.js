import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {sendApplication} from './api.js'

export default function JobCard(props) {

    function apply(){
        sendApplication(props.job.id, function(err, res) {
            if(err){
                alert("ERROR");
                return;
            }
        });
    }

    return(
        <Card sx={{margin: "20px"}} variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{props.job.companyName}</Typography>
                <Typography variant="h5">{props.job.title}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">{props.job.location}</Typography>
                <Typography variant="body2">{props.job.salary}{props.job.currency} / year</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => {apply()}}>Quick Apply</Button>
            </CardActions>
        </Card>
    );
}