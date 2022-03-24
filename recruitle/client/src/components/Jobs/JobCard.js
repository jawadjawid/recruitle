import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {sendApplication} from './api.js'
import { useQuery } from "@apollo/client";
import {APPLICATION_EXISTS} from '../../queries/queries.js'
import { getUsername } from "../api.js";

export default function JobCard(props) {
    const {data, loading} = useQuery(APPLICATION_EXISTS, {variables: {applicantId: getUsername(), jobId: props.job.id}});
    const [applied, setApplied] = React.useState(false);
    
    function applicationExists(){
        if(!loading) {
            return data?.applicationExists || applied;
        }
        return false;
    }

    function apply(){
        setApplied(true);
        sendApplication(props.job.id, function(err, res) {
            if(err){
                setApplied(false);
                props.enqueueSnackbar("Failed to quick apply, please try again", {variant: "error"});
            } else {
                props.enqueueSnackbar("Application sent!", {variant: "success"});
            }
        });
    }

    return(
        <Card sx={{pageBreakInside: "avoid", breakInside: "avoid", marginBottom: "20px", backgroundColor: "lightskyblue"}} variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{props.job.companyName}</Typography>
                <Typography variant="h5">{props.job.title}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">{props.job.location}</Typography>
                <Typography variant="body2">{props.job.salary} {props.job.currency}/year</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => {apply()}} disabled={applicationExists()}>Quick Apply</Button>
            </CardActions>
        </Card>
    );
}