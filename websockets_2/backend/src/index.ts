import express from "express";
import { WebSocketServer, WebSocket } from "ws";
const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

let USERS: Record<string, WebSocket[]> = {};

// payload from client
// {
//     type: "chat",
//     payload: {
//         room_id: "room_id",
//         message:"Message"
//     }
// }

wss.on("connection", (socket) => {
  console.log("Connection made");
  // get event
  socket.on("message", (message) => {
    console.log("sending message");
    // get the parsedData
    const parsedData = JSON.parse(message.toString());
    // check the type of the payload
    if (parsedData.type === "join") {
      // check for existing room
      if (USERS.hasOwnProperty(parsedData.payload.room_id)) {
        USERS[parsedData.payload.room_id].push(socket);
        console.log("New user added to existing room");
        console.log(USERS);
      } else {
        USERS[parsedData.payload.room_id] = [];
        USERS[parsedData.payload.room_id].push(socket);
        console.log("New room created");
        console.log(USERS);
      }
    }
    if (parsedData.type === "chat") {
      // chat should be sent to everyone in that particular room
      // emit messages only to the users in that room
      const currentRoom = parsedData.payload.room_id;
      const currentUsers = USERS[currentRoom];
      currentUsers.forEach((element) => {
        console.log(`Messsage sent from ${currentRoom} room`);
        element.send(parsedData.payload.message);
      });
    }
  });
});
