import { WebSocket } from "ws";
import { ROOMS } from ".";

export function joinRoom(parsedData: any, socket: WebSocket): Boolean {
  // check data.payload.room_id and based on that push it into the ROOMS object
  const data = parsedData;
  if (data.payload.room_id == "red") {
    // @ts-ignore
    ROOMS[data.payload.room_id].add(socket);
    return true;
  }
  if (data.payload.room_id == "green") {
    // @ts-ignore
    ROOMS[data.payload.room_id].add(socket);
    return true;
  }
  if (data.payload.room_id == "blue") {
    // @ts-ignore
    ROOMS[data.payload.room_id].add(socket);
    return true;
  }
  return false;
}
