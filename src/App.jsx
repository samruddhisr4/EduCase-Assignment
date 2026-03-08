import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AccountSettings from "./pages/AccountSettings";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "#E5E5E5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "375px",
              height: "812px",
              background: "#F7F8F9",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Landing />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
