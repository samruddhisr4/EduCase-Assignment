import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FloatingField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) => {
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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F7F8F9",
        overflowY: "auto",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div style={{ padding: "120px 50px 32px" }}>
        <p
          onClick={() => navigate("/")}
          style={{
            fontFamily: "Rubik, sans-serif",
            fontSize: "14px",
            color: "#6C25FF",
            cursor: "pointer",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ← Back
        </p>
        <h1
          style={{
            fontFamily: "Rubik, sans-serif",
            fontWeight: 500,
            fontSize: "28px",
            lineHeight: "36px",
            color: "#1D2226",
            marginBottom: "8px",
          }}
        >
          Signin to your
          <br />
          PopX account
        </h1>

        <p
          style={{
            fontFamily: "Rubik, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "26px",
            color: "#1D2226",
            opacity: 0.6,
            marginBottom: "32px",
          }}
        >
          Lorem ipsum dolor sit amet,
          <br />
          consectetur adipiscing elit,
        </p>

        <FloatingField
          label="Email Address"
          type="email"
          placeholder="Enter Email Address"
          value={form.email}
          onChange={set("email")}
          required
        />

        <FloatingField
          label="Password"
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={set("password")}
          required
        />

        {error && (
          <p
            style={{
              fontFamily: "Rubik, sans-serif",
              fontSize: "13px",
              color: "#DD4A3D",
              marginBottom: "8px",
              marginTop: "-4px",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={!isValid}
          style={{
            width: "100%",
            height: "50px",
            background: isValid ? "#6C25FF" : "#CBCBCB",
            borderRadius: "6px",
            border: "none",
            fontFamily: "Rubik, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            color: "#FFFFFF",
            cursor: isValid ? "pointer" : "not-allowed",
            marginTop: "8px",
          }}
        >
          Login
        </button>

        <p
          style={{
            fontFamily: "Rubik, sans-serif",
            fontSize: "13px",
            color: "#919191",
            textAlign: "center",
            marginTop: "16px",
            cursor: "pointer",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#6C25FF", fontWeight: 500 }}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
