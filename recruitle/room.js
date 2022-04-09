const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;


if (!process.env.TWILIO_API_KEY_SID){
  const twilioCreds = require('./config.js').twilio;
}

const twilioClient = require("twilio")(
  process.env.TWILIO_API_KEY_SID || twilioCreds.TWILIO_API_KEY_SID,
  process.env.TWILIO_API_KEY_SECRET || twilioCreds.TWILIO_API_KEY_SECRET,
  { accountSid: process.env.TWILIO_ACCOUNT_SID || twilioCreds.TWILIO_ACCOUNT_SID }
);

const findOrCreateRoom = async (roomName) => {
    try {
      console.log("Fetching " + roomName);
      await twilioClient.video.rooms(roomName).fetch();
    } catch (error) {
      if (error.code == 20404) {
        await twilioClient.video.rooms.create({
          uniqueName: roomName,
          type: "go",
        });
      } else {
        console.log(error);
      }
    }
};

const getAccessToken = (roomName) => {
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID || twilioCreds.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY_SID || twilioCreds.TWILIO_API_KEY_SID,
      process.env.TWILIO_API_KEY_SECRET || twilioCreds.TWILIO_API_KEY_SECRET,
      { identity: uuidv4() }
    );

    const videoGrant = new VideoGrant({
      room: roomName,
    });

    token.addGrant(videoGrant);
    return token.toJwt();
};

module.exports = {
  join: async (req, res) => {
    if (!req.body || !req.body.roomName) {
      return res.status(400).send("Must include roomName argument.");
    }
    const roomName = req.body.roomName;
    findOrCreateRoom(roomName);
    const token = getAccessToken(roomName);
    console.log("Sending token: " + token);
    res.send({
      token: token,
    });
  }
}