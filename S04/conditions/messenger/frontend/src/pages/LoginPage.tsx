import React, { useState } from "react";
import type { User } from "../types";
import { login } from "../api/authApi";
import { setToken } from "../helpers/authStorage";
import { handleError } from "../helpers/handleError";

type Props = {
  onLogin: (token: string, user: User) => void;
};

export function LoginPage({ onLogin }: Props) {
  const [phone, setPhone] = useState<string>("+79990000000");
  const [password, setPassword] = useState<string>("123456");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await login({ phone, password });
      setToken(token);
      onLogin(token, user);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Входим..." : "Войти"}
        </button>
      </form>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
    </div>
  );
}

export default LoginPage;