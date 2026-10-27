import axios from "axios";
import type { User } from "../types";
import { parseJsonResponse } from "../helpers/handleError";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

async function readErrorOrThrow(response: Response, fallback: string): Promise<never> {
  let message = fallback;
  try {
    const data = await response.json();
    if (data?.message) message = data.message;
  } catch {
  }
  if (response.status === 401) {
    message = "Сессия истекла. Войдите заново.";
  }
  throw new Error(message);
}

export async function getProfile(token: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: authHeaders(token)
  });
  if (!response.ok) {
    await readErrorOrThrow(response, `Ошибка ${response.status}`);
  }
  return parseJsonResponse<User>(response);
}

export type UpdateProfilePayload = Partial<Pick<User, "nickname" | "bio">>;

export async function updateProfile(
  token: string,
  { nickname, bio }: UpdateProfilePayload
): Promise<User> {
  const { data } = await axios.put<User>(
    `${API_URL}/users/me`,
    { nickname, bio },
    { headers: authHeaders(token) }
  );
  return data;
}