import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [websocket, setWebsocket] = useState();
  const inputRef = useRef<HTMLInputElement>();
  function getMessage() {
    if (!inputRef.current.value) return;
    const message = inputRef.current.value;
    if (!websocket) return;
    // @ts-ignore
    // console.log(websocket);
    websocket.send(message);
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    if (!ws) return;
    setWebsocket(ws);
    // get message alert
    ws.onmessage = (ev) => {
      console.log(ev.data);
      alert(ev.data);
    };
  }, []);

  return (
    <>
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="enter the message to see websocket connection"
        />
        <button onClick={getMessage}>Send</button>
      </div>
    </>
  );
}

export default App;
