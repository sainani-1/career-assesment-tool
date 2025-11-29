import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Assessment from "./pages/Assessment";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

import { getCurrentUser } from "./utils/auth";

export default function App() {
  const [user, setUser] = React.useState(getCurrentUser());

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login onLogin={() => setUser(getCurrentUser())} />}
        />

        <Route
          path="/register"
          element={<Register onRegister={() => setUser(getCurrentUser())} />}
        />

        <Route
          path="/assessment"
          element={
            <ProtectedRoute allowed={["student"]}>
              <Assessment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowed={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
