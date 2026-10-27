import type { Message } from "../types";

const WS_URL = import.meta.env?.VITE_WS_URL || "ws://localhost:3001";

type SocketCallbacks = {
  onMessage?: (message: Message) => void;
  onStatus?: (status: string) => void;
};

export function connectSocket(
  token: string,
  { onMessage, onStatus }: SocketCallbacks
) {
  const socket = new WebSocket(WS_URL);

  socket.addEventListener("open", () => onStatus?.("connected"));
  socket.addEventListener("close", () => onStatus?.("disconnected"));
  socket.addEventListener("error", () => onStatus?.("error"));

  socket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data?.type === "message:new" && data.payload) {
        onMessage?.(data.payload as Message);
      }
    } catch {
    }
  });

  return {
    sendMessage(text: string) {
      if (socket.readyState !== WebSocket.OPEN) {
        throw new Error("Сокет не подключён");
      }
      socket.send(
        JSON.stringify({
          type: "message:send",
          payload: { text, token }
        })
      );
    },
    disconnect() {
      try {
        socket.close();
      } catch {
      }
    }
  };
}