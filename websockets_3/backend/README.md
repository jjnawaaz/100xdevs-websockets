flowchart LR

    U1["User"] --> WS1(("WS-1"))
    U2["User"] --> WS1

    U3["User"] --> WS2(("WS-2"))
    U4["User"] --> WS2

    U5["User"] --> WS3(("WS-3"))
    U6["User"] --> WS3

    WS1 -->|"PUBLISH"| Redis["Redis Pub/Sub"]
    WS2 -->|"PUBLISH"| Redis
    WS3 -->|"PUBLISH"| Redis

    Redis -->|"SUBSCRIBE"| WS1
    Redis -->|"SUBSCRIBE"| WS2
    Redis -->|"SUBSCRIBE"| WS3

    ### Flow

1. A user sends a message to its connected WebSocket server.
2. The WebSocket server publishes the message to Redis Pub/Sub.
3. All WebSocket server instances subscribed to the channel receive the message.
4. Each server broadcasts the message to its locally connected users.
5. The originating server ignores its own published message using its server ID/port.