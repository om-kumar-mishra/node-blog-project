// Import the required modules
// const AgoraRTC = require('agora-rtc-sdk');
// const AgoraWhiteboard = require('agora-whiteboard-sdk');
// const express = require('express');
// const http = require('http');

// // Create an express app and server
// const app = express();
// const server = http.createServer(app);

// // Set up the Agora RTC client
// const agoraAppId = 'c6b2e0c4d53f4c5b961d4c1ee142e35e';
// const rtc = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });
// rtc.init(agoraAppId);

// // Set up the Agora Whiteboard client
// const wb = new AgoraWhiteboard();
// wb.init(agoraAppId);

// // Set up the express app to serve static files
// // app.use(express.static(__dirname + '/public'));

// // Set up the route to create a new whiteboard
// agoraWhiteboardCreate= async(req, res) => {
//   try {
//     const response = await wb.createRoom();
//     res.status(200).send(response);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// };

// // Set up the route to join an existing whiteboard
// agoraWhiteBoardjoin= async (req, res) => {
//   try {
//     const { roomId } = req.body;
//     const response = await wb.joinRoom(roomId);
//     res.status(200).send(response);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// };

// // Set up the Agora RTC client to join a channel
// joinWhiteBorad=(req,res)=>{
//     const channel = 'my-channel';
//     rtc.join(null, channel, null, () => {
//       console.log(`Joined channel ${channel}`);
    
//       // Set up the Agora RTC client to publish a stream
//       const stream = AgoraRTC.createStream({
//         streamID: 12345,
//         audio: true,
//         video: true,
//         screen: false,
//       });
//       stream.init(() => {
//         rtc.publish(stream);
//         console.log(`Published stream ${stream.getId()}`);
//       });
//     });
    
// }

// // // Start the server
// // const port = process.env.PORT || 3000;
// // server.listen(port, () => {
// //   console.log(`Server started on port ${port}`);
// // });




// module.exports = { agoraWhiteboardCreate, agoraWhiteBoardjoin,joinWhiteBorad}