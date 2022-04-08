import { useQuery } from "@apollo/client";
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GET_INTERVIEWS } from "../../queries/queries";
import { getUsername } from "../api.js";
import InterviewCard from "./InterviewCard";
import { useNavigate } from 'react-router-dom';

export default function InterviewsPage(props) {
    const navigate = useNavigate();
    const {data, loading} = useQuery(GET_INTERVIEWS, { variables: { id: getUsername() } });
    if (loading) return (<p>No data</p>);

    if (getUsername() == '') navigate('/');

    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography component="h1" variant="h2">Interviews</Typography>
            <Box sx={{
                columnCount: 1,
                margin: "auto",
                marginTop: "20px",
                width: "70%",
            }}>
                {data.interviews.map(interview => (<InterviewCard interview={interview} userType={props.userType}></InterviewCard>))}
            </Box>
        </Box>
    );
}