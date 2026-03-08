const USER_KEY = "popx_user";
const TOKEN_KEY = "popx_token";
const TOKEN_EXPIRY_DAYS = 7;

// ── Save user to localStorage ──────────────────────────
export const saveUser = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

// ── Get user from localStorage ─────────────────────────
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// ── Generate & save auth token with expiry ─────────────
export const saveToken = () => {
  const expiresAt =
    new Date().getTime() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const token = {
    value: "popx_auth_token",
    expiresAt,
  };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

// ── Get token from localStorage ────────────────────────
export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? JSON.parse(token) : null;
};

// ── Check if token is valid and not expired ────────────
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  const isExpired = new Date().getTime() > token.expiresAt;
  if (isExpired) {
    clearToken();
    return false;
  }
  return true;
};

// ── Clear only token (keep user data) ─────────────────
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// ── Full logout — clear token only ────────────────────
export const logout = () => {
  clearToken();
};

// ── Validate login credentials ─────────────────────────
export const validateLogin = (email, password) => {
  const user = getUser();
  if (!user)
    return {
      success: false,
      message: "No account found. Please register first.",
    };
  if (user.email !== email)
    return { success: false, message: "Email not found." };
  if (user.password !== password)
    return { success: false, message: "Incorrect password." };
  return { success: true, user };
};
