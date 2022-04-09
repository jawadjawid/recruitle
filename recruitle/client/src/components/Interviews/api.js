import { send } from '../api.js';

export function joinRoom(roomName, callback) {
    send("POST", "/join-room/", {roomName: roomName}, callback);
}