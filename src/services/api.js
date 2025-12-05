import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost/SkillSphere/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // withCredentials: true, // enable if you use HTTP-only cookies for auth
});

// Attach token automatically to requests
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("ss_auth_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized response handling / error formatting
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Optionally log or transform errors
    // const status = err?.response?.status;
    // if (status === 401) { /* handle unauthorized globally if needed */ }
    return Promise.reject(err);
  }
);

export default api;
