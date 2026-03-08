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

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    isAgency: null,
  });
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const isValid = form.fullName && form.phone && form.email && form.password;

  const handleSubmit = () => {
    if (!isValid) return;
    register(form);
    navigate("/account");
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
        padding: "40px 20px 32px",
      }}
    >
      <div style={{ padding: "50px 40px 32px" }}>
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
            marginBottom: "28px",
          }}
        >
          Create your
          <br />
          PopX account
        </h1>

        <FloatingField
          label="Full Name"
          placeholder="Enter Full Name"
          value={form.fullName}
          onChange={set("fullName")}
          required
        />
        <FloatingField
          label="Phone number"
          type="tel"
          placeholder="Enter Phone Number"
          value={form.phone}
          onChange={set("phone")}
          required
        />
        <FloatingField
          label="Email address"
          type="email"
          placeholder="Enter your Email"
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
        <FloatingField
          label="Company name"
          placeholder="Enter Company Name"
          value={form.company}
          onChange={set("company")}
        />

        {/* Agency */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              fontFamily: "Rubik, sans-serif",
              fontSize: "14px",
              color: "#1D2226",
              marginBottom: "12px",
            }}
          >
            Are you an Agency?
            <span style={{ color: "#6C25FF" }}> *</span>
          </p>
          <div style={{ display: "flex", gap: "28px" }}>
            {[
              { label: "Yes", val: true },
              { label: "No", val: false },
            ].map((opt) => (
              <label
                key={opt.label}
                onClick={() => setForm({ ...form, isAgency: opt.val })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  fontFamily: "Rubik, sans-serif",
                  fontSize: "14px",
                  color: "#1D2226",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: `2px solid ${form.isAgency === opt.val ? "#6C25FF" : "#CBCBCB"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {form.isAgency === opt.val && (
                    <div
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: "#6C25FF",
                      }}
                    />
                  )}
                </div>
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
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
          }}
        >
          Create Account
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
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#6C25FF", fontWeight: 500 }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
