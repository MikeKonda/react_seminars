import axios from "axios";
import type { Message } from "../types";
import { parseJsonResponse } from "../helpers/handleError";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export async function getMessages(token: string): Promise<Message[]> {
  const response = await fetch(`${API_URL}/messages`, {
    method: "GET",
    headers: authHeaders(token)
  });
  if (!response.ok) {
    let message = `Ошибка ${response.status}`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
    }
    if (response.status === 401) message = "Сессия истекла. Войдите заново.";
    throw new Error(message);
  }
  const list = await parseJsonResponse<Message[]>(response);
  return Array.isArray(list) ? list : [];
}

export async function sendMessage(token: string, text: string): Promise<Message> {
  const { data } = await axios.post<Message>(
    `${API_URL}/messages`,
    { text },
    { headers: authHeaders(token) }
  );
  return data;
}