import React, { useEffect } from "react";
import { useRoom } from 'use-twilio-video';
import Participant from './Participant';

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
        <div>
          <div>
            <button onClick={() => disconnectRoom()}>Leave</button>
            <button onClick={() => toggleCamera()}>
              {isCameraOn ? 'Disable Camera' : 'Enable Camera'}
            </button>
            <button onClick={() => toggleMicrophone()}>
              {isMicrophoneOn ? 'Mute' : 'Unmute'}
            </button>
          </div>
  
          <Participant participant={localParticipant} />
  
          <div>Dominant speaker: {JSON.stringify(dominantSpeaker?.identity)}</div>
  
          <div>
            {remoteParticipants.map(p => (
              <Participant participant={p} />
            ))}
          </div>
        </div>
      );
    else 
      return (
        <p>Loading...</p>
      );
}