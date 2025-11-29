import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    setUser(null);
    navigate("/login");
  }

  return (
    <nav className="nav">
      <Link to="/">Home</Link>

      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}

      {user?.role === "student" && <Link to="/assessment">Assessment</Link>}

      {user?.role === "admin" && <Link to="/admin">Admin</Link>}

      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}
