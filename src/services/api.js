/**
 * src/services/api.js
 *
 * THE HTTP CLIENT (AXIOS INSTANCE)
 * --------------------------------
 * Instead of using 'fetch' or 'axios' directly in every component, we create a
 * single, centralized instance here.
 *
 * BENEFITS:
 * 1. Base URL Config: Change the server URL in one place.
 * 2. Interceptors: Automatically attach Auth tokens to every request.
 * 3. Error Handling: Centralized place to catch 401s (Unauthorized) or 500s.
 */

import axios from "axios";

// Create the custom instance
const api = axios.create({
  // Read API URL from environment variables (e.g., .env file)
  // Fallback to localhost if not defined
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost/SkillSphere/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * -------------------
 * This function runs BEFORE any request is sent to the internet.
 */
api.interceptors.request.use(
  async (config) => {
    // -----------------------------------------------------------------------
    // MOCK API LOGIC (FOR DEMONSTRATION ONLY)
    // -----------------------------------------------------------------------
    // Since we don't have a real backend running for this demo, we "intercept"
    // requests to specific URLs and return fake data.
    // In a real production app, you would DELETE THIS BLOCK.
    if (config.url === "/courses" && config.method === "get") {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate 800ms Network Delay

      const mockCourses = [
        {
          id: 1,
          title: "React Fundamentals",
          description: "Master the basics of React.",
          price: 49.99,
          // Unsplash placeholder image
          image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        },
        {
          id: 2,
          title: "Advanced Hooks Patterns",
          description: "Deep dive into useRef, useMemo, and custom hooks.",
          price: 79.99,
          image:
            "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
        },
        {
          id: 3,
          title: "FullStack MERN",
          description: "Build a complete app with Mongo, Express, React, Node.",
          price: 99.99,
          image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        },
      ];

      // We attach an 'adapter' to bypass the real network request
      config.adapter = async () => {
        return {
          data: mockCourses,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
          request: {},
        };
      };
    }
    // -----------------------------------------------------------------------
    // END MOCK LOGIC
    // -----------------------------------------------------------------------

    // REAL AUTHENTICATION LOGIC
    // Look for the token in the browser's localStorage
    try {
      const token = localStorage.getItem("ss_auth_token");

      // If found, append it to the Authorization header
      // This is how the backend knows who we are.
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      // Handle potential localStorage access errors (e.g. Incognito mode restrictions)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * --------------------
 * This function runs AFTER a response is received, but BEFORE your component sees it.
 */
api.interceptors.response.use(
  (res) => res, // If success, just return the response
  (err) => {
    // If error, we can catch standard issues globally

    // Example: If token expired (401), we could force a logout
    // const status = err?.response?.status;
    // if (status === 401) { window.location.href = '/login'; }

    return Promise.reject(err);
  }
);

export default api;
