import React, { createContext, useContext, useState, useEffect } from "react";
import {
  isAuthenticated,
  saveUser,
  saveToken,
  logout as logoutUtil,
  validateLogin,
  getUser,
} from "../auth/authUtils";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on app load
  useEffect(() => {
    const authenticated = isAuthenticated();
    if (authenticated) {
      setIsLoggedIn(true);
      setCurrentUser(getUser());
    }
    setLoading(false);
  }, []);

  // Register new user + auto login
  const register = (userData) => {
    saveUser(userData);
    saveToken();
    setCurrentUser(userData);
    setIsLoggedIn(true);
    return { success: true };
  };

  // Login existing user
  const login = (email, password) => {
    const result = validateLogin(email, password);
    if (result.success) {
      saveToken();
      setCurrentUser(result.user);
      setIsLoggedIn(true);
    }
    return result;
  };

  // Logout
  const logout = () => {
    logoutUtil();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
