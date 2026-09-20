import { WebSocket } from "ws";
import { ROOMS } from ".";

export function blueRoom(data: any) {
  // @ts-ignore
  ROOMS["blue"].forEach((ws: WebSocket) => {
    // subscribe to red-room events
    ws.send(data);
  });
}
