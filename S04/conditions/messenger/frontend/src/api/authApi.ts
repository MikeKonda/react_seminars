import axios from "axios";
import type { User } from "../types";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

export type LoginPayload = {
  phone: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export async function login({ phone, password }: LoginPayload): Promise<LoginResponse> {
  const { data } = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { phone, password });
  if (!data?.token) {
    throw new Error("Сервер не вернул токен");
  }
  return data;
}