import React, { useState } from "react";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder="Введите сообщение"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !text.trim()}>
        Отправить
      </button>
    </form>
  );
}

export default MessageInput;