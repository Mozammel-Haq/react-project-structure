import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import parseJwt from "../helpers/parseJWT";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: load user from token
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("ss_auth_token");
      if (!token) {
        setLoading(false);
        return;
      }

      const decoded = parseJwt(token);
      if (decoded) {
        
        const userFromToken = {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role_id: decoded.role_id,
        };
        setUser(userFromToken);
      } else {
        // Invalid token
        localStorage.removeItem("ss_auth_token");
        setUser(null);
      }
      setLoading(false);
    };

    init();
  }, []);

  // login using backend
  async function login(email, password) {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      const returnedUser = res.data.user;

      if (token && returnedUser) {
        localStorage.setItem("ss_auth_token", token);
        setUser(returnedUser);
        return returnedUser;
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      localStorage.removeItem("ss_auth_token");
      setUser(null);
      throw err;
    }
  }

  // register 
  async function register(payload) {
    const res = await api.post("/auth/register", payload);
    return res.data;
  }

  async function logout() {
    try {
      // if backend supports logout endpoint to invalidate token
      await api.post("/auth/logout");
    } catch (err) {
      // ignore errors but you may want to handle them
      console.warn("logout request failed:", err?.message || err);
    } finally {
      localStorage.removeItem("ss_auth_token");
      setUser(null);
    }
  }

  const value = { user, loading, login, logout, register };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
