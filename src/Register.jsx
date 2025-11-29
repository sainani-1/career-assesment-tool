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
    <div>
      <h2>Create Student Account</h2>

      <form onSubmit={register}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button>Register</button>
      </form>
    </div>
  );
}
