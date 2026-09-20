import { WebSocketServer } from "ws";
import express from "express";
const app = express();

const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });
wss.on("connection", function connect(socket) {
  console.log("Socket connection established");
  //   socket.send("Hello from socket");

  // ping pong logic
  socket.on("message", (data) => {
    console.log(data.toString());
    if (data.toString() == "ping") {
      socket.send("pong");
    }
  });

  // setInterval gets messages every 500ms
  //   setInterval(() => {
  //     socket.send("The value of SOL is: " + Math.random());
  //   }, 500);
});
