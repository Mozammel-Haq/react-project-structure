/**
 * src/contexts/UserContext.jsx
 * 
 * GLOBAL AUTHENTICATION STATE
 * ---------------------------
 * This Context handles "Who is the current user?".
 * It wraps the entire app, providing `user`, `login`, `logout` to any component.
 */

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import api from "../services/api";
import parseJwt from "../helpers/parseJWT";
import useLocalStorage from "../hooks/useLocalStorage";

// Create the Context object
const UserContext = createContext();

export function UserProvider({ children }) {
  // 1. STATE DEFINITIONS
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Custom Hook: 'ss_auth_token' is the key in localStorage.
  // This hook keeps the state 'token' in sync with localStorage automatically.
  const [token, setToken] = useLocalStorage("ss_auth_token", null);

  // 2. INITIAL AUTH CHECK (On Mount or Token Change)
  useEffect(() => {
    // If no token exists, we are definitely logged out.
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // If token exists, we try to decode it (Client-side check).
    // In a real sophisticated app, you might also hit an endpoint like /auth/me
    // to verify the token is still valid on the server.
    const decoded = parseJwt(token);
    
    if (decoded) {
      // If decode success, set the user state
      setUser({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role_id: decoded.role_id,
      });
    } else {
      // If decode fails (malformed token), clear it.
      setToken(null);
      setUser(null);
    }
    setLoading(false);
  }, [token, setToken]);

  // 3. ACTIONS

  // Login: Calls API -> Gets Token -> Saves Token
  const login = useCallback(async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const newToken = res.data.token;
      const returnedUser = res.data.user;

      if (newToken && returnedUser) {
        // Setting the token triggers the useEffect above to update 'user' state
        setToken(newToken);
        return returnedUser;
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      setToken(null);
      setUser(null);
      throw err;
    }
  }, [setToken]);

  // Register: Just calls the API
  const register = useCallback(async (payload) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  }, []);

  // Logout: Clear the token
  const logout = useCallback(async () => {
    try {
      // Optional: Tell server to blacklist token
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("logout request failed:", err?.message || err);
    } finally {
      // Clearing the token is the most important part
      setToken(null);
    }
  }, [setToken]);

  // 4. MEMOIZATION
  // We wrap the context value in useMemo.
  // WHY? If we passed a new object {{...}} every time UserProvider renders,
  // ALL components listening to this context would re-render unnecessarily.
  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    register
  }), [user, loading, login, logout, register]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Helper hook to use the context
export function useUser() {
  return useContext(UserContext);
}
