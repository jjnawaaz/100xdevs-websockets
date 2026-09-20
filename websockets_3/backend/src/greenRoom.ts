import { WebSocket } from "ws";
import { ROOMS } from ".";

export function greenRoom(data: any) {
  // @ts-ignore
  ROOMS["green"].forEach((ws: WebSocket) => {
    // subscribe to red-room events
    ws.send(data);
  });
}
