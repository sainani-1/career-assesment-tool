import React, { useState } from "react";
import { saveUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email === "admin@admin.com" && pass === "admin123") {
      saveUser({ email, role: "admin" });
      onLogin();
      navigate("/admin");
      return;
    }

    saveUser({ email, role: "student" });
    onLogin();
    navigate("/");
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password (admin only)"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <button>Login</button>
    </form>
  );
}
