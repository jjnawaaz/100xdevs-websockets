import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    console.log(ws);
    if (!ws) return;
    setWs(ws);
    ws.onopen = () => {
      const connectionData = JSON.stringify({
        type: "join",
        payload: {
          room_id: "red",
        },
      });
      ws.send(connectionData);
    };

    ws.onmessage = (ev) => {
      if (!ev.data) return;
      setMessages((prev) => {
        return [...prev, ev];
      });
    };

    // what should happen when ws connection is closed
    ws.onclose = () => console.log("The socket connection is closed");
    return () => ws.close();
  }, []);
  console.log(messages);
  return (
    <>
      {/* Page Section  */}
      <div className="bg-black h-[100vh] flex flex-col justify-between">
        {/* Chat Box */}
        <div className="bg-purple-100 h-[95vh]">
          {/* Map messages array here  */}
          {messages.map((event, idx) => [
            <div key={idx}>
              <span>{event.data}</span>
            </div>,
          ])}
        </div>
        {/* Input Box  */}
        <div className="flex flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter message"
            className="w-[90%]"
          />
          <button
            className="bg-slate-400 text-white rounded-sm w-[10%] "
            onClick={() => {
              if (!ws) return;
              const message = {
                type: "chat",
                payload: {
                  room_id: "red",
                  message: inputRef.current?.value,
                },
              };
              ws.send(JSON.stringify(message));
              inputRef.current.value = "";
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
