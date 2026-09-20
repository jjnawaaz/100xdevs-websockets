import { WebSocket } from "ws";
import { ROOMS } from ".";

export function redRoom(data: any) {
  // @ts-ignore
  ROOMS["red"].forEach((ws: WebSocket) => {
    // subscribe to red-room events
    ws.send(data);
  });
}
