import React, { useState } from "react";
import { saveUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    // Check CAPTCHA
    if (!captchaValue) {
      alert("Please complete the CAPTCHA");
      return;
    }

    // Admin login
    if (email === "admin@admin.com" && pass === "admin123") {
      saveUser({ email, role: "admin" });
      onLogin();
      navigate("/admin");
      return;
    }

    // Student login
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
        required
      />

      <input
        type="password"
        placeholder="Password (admin only)"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      {/* CAPTCHA */}
      <ReCAPTCHA
        sitekey="6LftWRwsAAAAAKSpCh3482uEyfos9w7CBCrPlQZv"
        onChange={(value) => setCaptchaValue(value)}
      />

      <button>Login</button>
    </form>
  );
}
