import React, { useState } from "react";
import { saveUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function register(e) {
    e.preventDefault();

    saveUser({ email, role: "student" });
    onRegister();
    navigate("/");
  }

  return (
    <form onSubmit={register}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button>Create Account</button>
    </form>
  );
}
