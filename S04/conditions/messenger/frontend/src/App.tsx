import React, { useState } from "react";
import type { User } from "./types";
import { getToken, clearToken } from "./helpers/authStorage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";

type Tab = "login" | "profile" | "chat";

export function App() {
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [tab, setTab] = useState<Tab>(() => (getToken() ? "chat" : "login"));

  const handleLogin = (newToken: string, _user: User) => {
    setTokenState(newToken);
    setTab("chat");
  };

  const handleLogout = () => {
    clearToken();
    setTokenState(null);
    setTab("login");
  };

  const authed = Boolean(token);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <strong style={{ marginRight: "auto" }}>Messenger Mini</strong>
        <nav style={{ display: "flex", gap: 6 }}>
          {!authed ? (
            <button onClick={() => setTab("login")} disabled={tab === "login"}>
              Вход
            </button>
          ) : (
            <>
              <button onClick={() => setTab("profile")} disabled={tab === "profile"}>
                Профиль
              </button>
              <button onClick={() => setTab("chat")} disabled={tab === "chat"}>
                Чат
              </button>
              <button onClick={handleLogout}>Выйти</button>
            </>
          )}
        </nav>
      </header>

      <main>
        {!authed || tab === "login" ? (
          <LoginPage onLogin={handleLogin} />
        ) : tab === "profile" && token ? (
          <ProfilePage token={token} />
        ) : tab === "chat" && token ? (
          <ChatPage token={token} />
        ) : null}
      </main>
    </div>
  );
}

export default App;