import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

export default function ProtectedRoute({ allowed, children }) {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" />;

  if (!allowed.includes(user.role)) return <Navigate to="/" />;

  return children;
}
