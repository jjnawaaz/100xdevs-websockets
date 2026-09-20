import { WebSocket, WebSocketServer } from "ws";
import express from "express";
import Redis from "ioredis";
import "dotenv/config";
import { redRoom } from "./redRoom";
import { joinRoom } from "./joinRoom";
import { greenRoom } from "./greenRoom";
import { blueRoom } from "./blueRoom";
const app = express();

console.log(process.env.password, process.env.redis_port, process.env.host);

// create redis subscriber
export const subscriber = new Redis({
  username: "default",
  password: process.env.password,
  host: process.env.host,
  port: Number(process.env.redis_port),
});
// subscribe to red room notifications
subscriber.subscribe("red-room-notifications", (err) => {
  if (err) {
    console.error("Failed to subscribe: ", err.message);
    return;
  }
  console.log("Subscribed to red room notifications successfully");
});
// subscribe to green room notifications
subscriber.subscribe("green-room-notifications", (err) => {
  if (err) {
    console.error("Failed to subscribe: ", err.message);
    return;
  }
  console.log("Subscribed to green room notifications successfully");
});
// subscribe to blue room notifications
subscriber.subscribe("blue-room-notifications", (err) => {
  if (err) {
    console.error("Failed to subscribe: ", err.message);
    return;
  }
  console.log("Subscribed to blue room notifications successfully");
});

// when message
subscriber.on("message", (channel, data) => {
  console.log("hitting pub/sub");
  const parsedData = JSON.parse(data);
  if (parsedData.PORT == process.env.PORT) return;
  // check channel
  switch (channel) {
    case "red-room-notifications":
      ROOMS["red"].forEach((ws) => {
        //@ts-ignore
        ws.send(parsedData.message);
      });
      break;
    case "green-room-notifications":
      ROOMS["green"].forEach((ws) => {
        //@ts-ignore
        ws.send(parsedData.message);
      });
      break;
    case "blue-room-notifications":
      ROOMS["blue"].forEach((ws) => {
        //@ts-ignore
        ws.send(parsedData.message);
      });
      break;
    default:
      () => {
        console.log("Invalid Message sent from pub/sub");
      };
      break;
  }
});

// create redis publisher
export const publisher = subscriber.duplicate();

const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT);

const wss = new WebSocketServer({ server: httpServer });
if (wss) {
  console.log("Socket server created on port: " + PORT);
}

// structure of the payloads

// Join Payload
// {
//     "type":"join",
//     "payload":{
//         "room":"red"|"green"|"blue"
//     }
// }

// Message Payload
// {
//     "type":"chat",
//     "payload":{
//         "room":"red"|"green"|"blue",
//         "message":"message from the user"
//     }
// }

export const ROOMS = {
  red: new Set(),
  green: new Set(),
  blue: new Set(),
};

wss.on("connection", (socket) => {
  console.log("New connection added");
  socket.on("message", async (event) => {
    // get the parsed Data
    const parsedData = JSON.parse(event.toString());

    // check the rooms and join rooms
    // function join room
    if (parsedData.type == "join") {
      const joined = joinRoom(parsedData, socket);
      if (joined) {
        socket.send("User added to room: " + parsedData.payload.room_id);
        console.log("User added to room: " + parsedData.payload.room_id);
      }
    }
    // chat send chats to that particular room
    if (parsedData.type == "chat") {
      // switch statement to call correct red green blue functions
      // redis payload to uniquely identify ws-servers
      const message = {
        PORT: process.env.PORT,
        message: parsedData.payload.message,
      };
      switch (parsedData.payload.room_id) {
        case "red":
          redRoom(parsedData.payload.message);
          await publisher.publish(
            "red-room-notifications",
            JSON.stringify(message),
          );
          break;
        case "green":
          greenRoom(parsedData.payload.message);
          await publisher.publish(
            "green-room-notifications",
            JSON.stringify(message),
          );
          break;
        case "blue":
          blueRoom(parsedData.payload.message);
          await publisher.publish(
            "blue-room-notifications",
            JSON.stringify(message),
          );
          break;
        default:
          () => {
            socket.send("Invalid room_id");
            console.log("Invalid room entered");
          };
          break;
      }
    }
  });
});
