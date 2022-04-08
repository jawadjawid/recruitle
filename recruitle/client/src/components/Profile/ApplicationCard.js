import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function ApplicationCard(props) {
    return(
        <Card sx={{pageBreakInside: "avoid", breakInside: "avoid", marginBottom: "20px"}} variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" gutterBottom>{props.app.companyName}</Typography>
                <Typography variant="h5">{props.app.title}</Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary"><LocationOnOutlinedIcon fontSize="small"></LocationOnOutlinedIcon>{props.app.location}</Typography>
                <Typography sx={{mb: 1.5, wordBreak: "break-word"}} style={{whiteSpace: 'pre-line'}} variant="body1">{props.app.desc}</Typography>
                <Typography variant="body2">{props.app.salary} {props.app.currency}/year</Typography>
            </CardContent>
        </Card>
    );
}