import React, { useEffect, useRef, useState } from "react";
import type { Message } from "../types";
import { getMessages } from "../api/messageApi";
import { connectSocket } from "../api/socketClient";
import { handleError } from "../helpers/handleError";
import { MessageList } from "../components/MessageList";
import { MessageInput } from "../components/MessageInput";

type Props = {
  token: string;
};

type SocketClient = ReturnType<typeof connectSocket>;

export function ChatPage({ token }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [socketStatus, setSocketStatus] = useState<string>("disconnected");

  const clientRef = useRef<SocketClient | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    getMessages(token)
      .then((history) => {
        if (cancelled) return;
        setMessages(history);
      })
      .catch((err) => {
        if (!cancelled) setError(handleError(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    const client = connectSocket(token, {
      onMessage: (msg) => {
        setMessages((prev) =>
          prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
        );
      },
      onStatus: (status) => setSocketStatus(status)
    });
    clientRef.current = client;

    return () => {
      cancelled = true;
      client.disconnect();
      clientRef.current = null;
    };
  }, [token]);

  const socketConnected = socketStatus === "connected";

  const handleSend = (text: string) => {
    setError("");
    try {
      clientRef.current?.sendMessage(text);
    } catch (err) {
      setError(handleError(err));
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      <p>Статус сокета: {socketStatus}</p>
      {loading ? <p>Загрузка сообщений...</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <div style={{ marginBottom: 12 }}>
        <MessageList messages={messages} />
      </div>

      <MessageInput onSend={handleSend} disabled={!socketConnected} />
      {!socketConnected ? (
        <p style={{ color: "#a00", fontSize: 12 }}>
          Отправка доступна только при подключённом сокете
        </p>
      ) : null}
    </div>
  );
}

export default ChatPage;