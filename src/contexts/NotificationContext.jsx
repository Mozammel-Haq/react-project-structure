/**
 * src/contexts/NotificationContext.jsx
 * 
 * GLOBAL TOAST SYSTEM
 * -------------------
 * Allows any component to pop up a message (Success/Error).
 * It manages an array of notifications and auto-removes them after 2 seconds.
 */

import { createContext, useContext, useState, useCallback, useMemo } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // 'notify' adds a new message to the stack
  const notify = useCallback((type, message) => {
    // Generate a simple ID
    const id = Math.random();

    setNotifications((prev) => [
      ...prev,
      { id, type, message },
    ]);

    // Auto-remove logic
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 2000);
  }, []);

  // Helpers mainly for cleaner API usage: notify.success('Good job!')
  const notifyValue = useMemo(() => ({
    success: (msg) => notify("success", msg),
    error: (msg) => notify("error", msg),
  }), [notify]);

  const value = useMemo(() => ({
    notify: notifyValue,
    notifications,
  }), [notifyValue, notifications]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
