import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  // Wait until auth state is determined
  if (loading) {
    return (
      <div className="flex items-center justify-center w-mobile h-mobile bg-popx-bg">
        <div className="w-8 h-8 border-4 border-popx-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → redirect to landing
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
