import React from "react";
import type { Message } from "../types";

type Props = {
  messages: Message[];
};

export function MessageList({ messages }: Props) {
  if (!messages?.length) {
    return <p>Нет сообщений</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {messages.map((m) => (
        <li
          key={m.id}
          style={{
            marginBottom: 8,
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 6
          }}
        >
          <div style={{ fontWeight: "bold" }}>{m.author}</div>
          <div>{m.text}</div>
          <div style={{ fontSize: 12, color: "#666" }}>
            {new Date(m.createdAt).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MessageList;