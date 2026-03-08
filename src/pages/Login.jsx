import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FloatingField = ({ label, type = "text", placeholder, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <label
        style={{
          position: "absolute",
          top: "-9px",
          left: "12px",
          background: "#F7F8F9",
          padding: "0 4px",
          fontFamily: "Rubik, sans-serif",
          fontSize: "13px",
          color: "#6C25FF",
          zIndex: 1,
        }}
      >
        {label}
        {required && <span style={{ color: "#DD4A3D" }}> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: "52px",
          background: "#FFFFFF",
          border: `1px solid ${focused ? "#6C25FF" : "#CBCBCB"}`,
          borderRadius: "8px",
          padding: "0 16px",
          fontFamily: "Rubik, sans-serif",
          fontSize: "14px",
          color: "#1D2226",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const isValid = form.email && form.password;

  const handleLogin = () => {
    if (!isValid) return;
    setError("");
    const result = login(form.email, form.password);
    if (result.success) navigate("/account");
    else setError(result.message);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F7F8F9",
        overflowY: "auto",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ padding: "40px 36px 32px" }}>
        {/* Logo / Brand */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#6C25FF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span style={{ color: "#fff", fontFamily: "Rubik, sans-serif", fontWeight: 700, fontSize: "20px" }}>P</span>
          </div>
          <h1
            style={{
              fontFamily: "Rubik, sans-serif",
              fontWeight: 600,
              fontSize: "26px",
              lineHeight: "34px",
              color: "#1D2226",
              marginBottom: "6px",
            }}
          >
            Sign in to PopX
          </h1>
          <p
            style={{
              fontFamily: "Rubik, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "#919191",
            }}
          >
            Welcome back! Enter your credentials to continue.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            background: "#EFEFEF",
            borderRadius: "8px",
            padding: "4px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: "8px 0",
              background: "#FFFFFF",
              borderRadius: "6px",
              fontFamily: "Rubik, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#6C25FF",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              cursor: "default",
            }}
          >
            Login
          </div>
          <div
            onClick={() => navigate("/signup")}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "8px 0",
              fontFamily: "Rubik, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#919191",
              cursor: "pointer",
            }}
          >
            Register
          </div>
        </div>

        {/* Fields */}
        <FloatingField
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={set("email")}
          required
        />
        <div onKeyDown={handleKeyDown}>
          <FloatingField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={set("password")}
            required
          />
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "#FFF0EF",
              border: "1px solid #DD4A3D",
              borderRadius: "6px",
              padding: "10px 14px",
              marginBottom: "16px",
              marginTop: "-8px",
              fontFamily: "Rubik, sans-serif",
              fontSize: "13px",
              color: "#DD4A3D",
            }}
          >
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={!isValid}
          style={{
            width: "100%",
            height: "50px",
            background: isValid ? "#6C25FF" : "#CBCBCB",
            borderRadius: "8px",
            border: "none",
            fontFamily: "Rubik, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            color: "#FFFFFF",
            cursor: isValid ? "pointer" : "not-allowed",
            transition: "background 0.2s",
            marginBottom: "20px",
          }}
        >
          Login
        </button>

        {/* Register link */}
        <p
          style={{
            fontFamily: "Rubik, sans-serif",
            fontSize: "13px",
            color: "#919191",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#6C25FF", fontWeight: 500, cursor: "pointer" }}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
