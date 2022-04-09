import React, { useEffect } from "react";
import { useRoom } from 'use-twilio-video';
import Participant from './Participant';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Room({ token, roomName }) {
    const {
      room, // connected Room
      error, // room connection error
      connectRoom, // function to connect/join a Room
      disconnectRoom, // function to disconnect from a Room
      localParticipant, // Local Participant's properties
      remoteParticipants, // List of connected Remote Participants
      dominantSpeaker, // the Participant sharing the loudest audio track in the Room, if dominantSpeaker option is enabled
      isCameraOn, // camera state
      toggleCamera, // function to toggle on/off camera
      isMicrophoneOn, // microphone state
      toggleMicrophone // function to toggle on/off microphone
    } = useRoom();
  
    useEffect(() => {
      if (!room && token && roomName) {
        connectRoom({ token, options: { name: roomName, dominantSpeaker: true } }) 
        return () => disconnectRoom()
      }
    }, [connectRoom, disconnectRoom, room, roomName, token]);
    
    //   ....other
    // connected
    if (room)
      return (
        <React.Fragment sx={{margin: "auto"}}>
          <Box>
            <Button onClick={() => disconnectRoom()}>Leave</Button>
            <Button onClick={() => toggleCamera()}>
              {isCameraOn ? 'Disable Camera' : 'Enable Camera'}
            </Button>
            <Button onClick={() => toggleMicrophone()}>
              {isMicrophoneOn ? 'Mute' : 'Unmute'}
            </Button>
          </Box>
          <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyItems: "center"}}>
            <Participant participant={localParticipant} />
            
            <React.Fragment>
              {remoteParticipants.map(p => (
                <Participant participant={p} />
              ))}
            </React.Fragment>
          </Box>
        </React.Fragment>
      );
    else 
      return (
        <p>Loading...</p>
      );
}