# SkillSphere: The Ultimate React Reference Textbook

**Author**: Antigravity (Google DeepMind)
**Project**: SkillSphere Reference Application
**Stack**: React 19, Vite, Tailwind CSS, Axios, React Router 7

---

## 📖 Introduction

Welcome to **SkillSphere**. This is not just a project; it is a **Reference Implementation**.

When you build a house, you don't start by stacking bricks randomly. You look at a blueprint. This codebase is that blueprint for a scalable, production-grade React application.

### What Makes This "Reference Grade"?

1.  **Separation of Concerns**: Logic doesn't live inside UI components. It lives in _Hooks_. State doesn't live everywhere. It lives in _Context_.
2.  **Reusability**: We write code once (`useFetch`) and use it everywhere.
3.  **Security**: We handle Auth tokens automatically in the API layer, not in the button click handler.
4.  **Performance**: We use `useMemo`, `useCallback`, and lazy checking to ensure the app is fast.

---

## 🏛️ Chapter 1: The Entry Point

Every React app starts somewhere. In Vite, it starts at `src/main.jsx`.

### `src/main.jsx`

This file is the "Bootloader". It sets up the environment that the rest of the app lives in.

```javascript
/* src/main.jsx */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Tailwind imports live here
import { UserProvider } from "./contexts/UserContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";

// ReactDOM.createRoot finds the <div id="root"> in index.html and takes control of it.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 
       PROVIDER HELL (Or Heaven?)
       We wrap the App in multiple "Providers". 
       This means ANY component inside App can access User, Theme, or Notifications.
    */}
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
```

**Why do we do this?**
If we didn't use Context Providers here, we would have to pass `user` props down 10 levels deep (Prop Drilling). Wrapping the root ensures global data is available everywhere.

---

## 🔌 Chapter 2: The Core Services

Before we build UI, we need a way to talk to the outside world (The Backend).

### `src/services/api.js`

This is one of the most important files in the project. It configures `axios`.

```javascript
/* src/services/api.js */

import axios from "axios";

// 1. Singleton Instance
// We don't import 'axios' in our pages. We import THIS 'api' instance.
// This lets us change the baseURL in one place.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor (The "Middleware")
// This function runs BEFORE every network request leaves your browser.
api.interceptors.request.use(
  (config) => {
    // It checks LocalStorage for a token
    const token = localStorage.getItem("auth_token");

    // If found, it attaches it to the header: "Authorization: Bearer xyz..."
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* 
   MOCKING API CALLS 
   Since we don't have a real backend, we use an interceptor to FAKE it.
   In a real app, you would DELETE the code below.
*/
api.interceptors.request.use(async (config) => {
  if (config.url === "/courses" && config.method === "get") {
    // Wait 800ms to simulate internet lag
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Throw an error to stop the real network request
    throw {
      response: {
        status: 200,
        data: [
          /* ... mock data array ... */
        ],
      },
      isMock: true, // Marker so we know it wasn't a real error
    };
  }
  return config;
});

// 3. Response Interceptor
// This runs on every response coming BACK from the server.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We catch the fake "error" we threw above and treat it as success
    if (error.isMock) return Promise.resolve(error.response);

    return Promise.reject(error);
  }
);

export default api;
```

---

## 🧠 Chapter 3: The Hooks Ecosystem (The "Brain")

This is where the magic happens. We build custom hooks to abstract complex logic.

### 1. `useFetch.js` (Data Fetching)

**The Problem**: Writing `useEffect` to fetch data in every component is repetitive and error-prone (race conditions, unmounted state updates).
**The Solution**:

```javascript
/* src/hooks/useFetch.js */
import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallback ensures this function doesn't change on every render
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // AbortController allows us to CANCEL the request if the user leaves the page
    const controller = new AbortController();

    try {
      const response = await api.get(url, {
        ...options,
        signal: controller.signal,
      });
      setData(response.data);
    } catch (err) {
      // Ignore errors caused by us cancelling the request
      if (err.name !== "CanceledError") {
        setError(err.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }

    // Cleanup function for useEffect
    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    const cleanup = fetchData();
    return cleanup; // This calls controller.abort() when component unmounts
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
```

### 2. `useForm.js` (Form Management)

**The Problem**: Managing `value` and `onChange` for 10 generic inputs.

```javascript
/* src/hooks/useForm.js */
import { useState } from "react";

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Generic Change Handler
  // Usage: <input name="email" onChange={handleChange} />
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value, // Dynamic property key
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    // Run validation function passed in
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length === 0) {
      callback(values); // Success! Use the values.
    } else {
      setErrors(validationErrors); // Block submit
    }
  };

  return { values, errors, handleChange, handleSubmit, setErrors };
};
```

---

## 🔐 Chapter 4: State Management (Context)

### `src/contexts/UserContext.jsx`

This handles Authentication. It decides "Who are you?"

```javascript
/* src/contexts/UserContext.jsx */
export const UserProvider = ({ children }) => {
  // We use our custom hook!
  // This looks in localStorage for 'auth_token' and starts with that.
  const [token, setToken] = useLocalStorage("auth_token", null);
  const [user, setUser] = useState(null);

  // Initial Load
  useEffect(() => {
    if (token) {
      // If we have a token, we pretend we are logged in.
      // In a real app, you'd verify this token with the backend here.
      api
        .get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    // 1. Call API
    const res = await api.post("/auth/login", { email, password });
    // 2. Save Token (useLocalStorage handles the disk write)
    setToken(res.data.token);
    // 3. Set User
    setUser(res.data.user);
  };

  const logout = () => {
    setToken(null); // Deletes from localStorage
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

## 🚦 Chapter 5: Routing & Security

### `src/router/AppRouter.jsx`

We define **Public** vs **Protected** routes here.

```javascript
<Routes>
  {/* PUBLIC LAYOUT: Navbar with Links */}
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/courses/:id" element={<CourseDetails />} />
  </Route>

  {/* PROTECTED LAYOUT: Dashboard Sidebar */}
  <Route
    path="/dashboard"
    element={
      // The Guard Dog
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route path="home" element={<DashboardHome />} />
    {/* ADMIN ONLY ROUTE */}
    <Route
      path="users"
      element={
        <ProtectedRoute allowedRoles={[1]}>
          <UserManagement />
        </ProtectedRoute>
      }
    />
  </Route>
</Routes>
```

### `src/router/ProtectedRoute.jsx`

```javascript
// This component renders its children ONLY if conditions are met.
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useUser();

  if (!user) {
    // Not logged in? Go to Login.
    // "state" remembers current page to redirect back later.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but not allowed? Go home.
    return <Navigate to="/" />;
  }

  // Checking passed. Render the page.
  return children;
};
```

---

## 🖼️ Chapter 6: Public Features (The "Storefront")

### `src/pages/public/CourseDetails.jsx`

This file demonstrates advanced **Nested Data Rendering** and **Conditional Access**.

**Logic Flow:**

1.  **Mock Data**: We defined a course object with `modules` -> `submodules`.
2.  **Accordion State**: `expandedModuleId` tracks which module is open.
3.  **Active Content State**: `activeSubmodule` tracks which video is playing.

**Key Code Snippet (The Accordion):**

```javascript
{
  course.modules.map((module) => (
    <div key={module.id}>
      {/* Header Click toggles the ID in state */}
      <button onClick={() => toggleModule(module.id)}>{module.title}</button>

      {/* Conditional Rendering: Only show if ID matches */}
      {expandedModuleId === module.id && (
        <ul>
          {module.submodules.map((sub) => (
            /* The Submodule Item */
            <li onClick={() => setActiveSubmodule(sub)}>
              {sub.title}
              {/* Lock Icon Logic */}
              {!sub.isFree && !user && <LockIcon />}
            </li>
          ))}
        </ul>
      )}
    </div>
  ));
}
```

**Key Code Snippet (The Player):**

```javascript
{
  /* If it's free OR user is logged in, show video. Else show lock overlay. */
}
{
  submodule.isFree || user ? (
    <VideoPlayer src={submodule.video} />
  ) : (
    <div className="overlay">
      <h3>Locked Content</h3>
      <Link to="/login">Login to Unlock</Link>
    </div>
  );
}
```

---

## 📊 Chapter 8: The Dashboard (Complex State)

### `src/pages/dashboard/UserManagement.jsx`

This page is special because it uses `useReducer`.

**Why useReducer?**
We have 4 pieces of state that change together: `users` array, `loading` boolean, `error` string, and `sort` configuration.
If we used `useState`, we might get "flickers" or inconsistent state updates.

```javascript
const initialState = { loading: false, users: [], error: null, sort: "id" };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload };
    // ...
  }
}

// In component:
const [state, dispatch] = useReducer(reducer, initialState);

// Triggering an update:
dispatch({ type: "FETCH_START" });
```

This pattern ("Redux-lite") makes complex logic predictable and easier to debug.

---

## 🏁 Conclusion

You have just walked through a comprehensive, production-ready React architecture.

**Key Takeaways:**

1.  **Structure Matters**: Organize files by feature or type, not randomly.
2.  **Abstractions Save Time**: Build hooks like `useFetch` early.
3.  **Security is Everywhere**: In the Router, in the API interceptors, and in the UI conditions.
4.  **UX is Detail**: Accordions, Loading skeletons, and Optimistic updates make the app feel professional.

**Next Steps**:
Try creating a new page called `Certificates`. Use `useFetch` to get data, `DashboardLayout` to wrap it, and add a link in `Sidebar.jsx`.

Good luck!
