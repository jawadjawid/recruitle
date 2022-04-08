import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useNavigate } from 'react-router-dom';
import ListApplicantsPage from './ListApplicantsPage'
import Link from '@mui/material/Link';

export default function ApplicationCard(props) {
    const navigate = useNavigate();

    const showApplicants= (jobId) => {
        navigate(`/applicants/${jobId}`)
    }

    return(
        <Card sx={{pageBreakInside: "avoid", breakInside: "avoid", marginBottom: "20px"}} variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" gutterBottom>{props.app.companyName}</Typography>
                <Typography variant="h5">{props.app.title}</Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary"><LocationOnOutlinedIcon fontSize="small"></LocationOnOutlinedIcon>{props.app.location}</Typography>
                <Typography sx={{mb: 1.5, wordBreak: "break-word"}} style={{whiteSpace: 'pre-line'}} variant="body1">{props.app.desc}</Typography>
                <Typography variant="body2">{props.app.salary} {props.app.currency}/year</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => showApplicants(props.app.id)} hidden={props.hideApplicants}>View Applicants</Button>
            </CardActions>
        </Card>
    );
}