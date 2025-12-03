import { createContext, useContext, useState, useCallback, useMemo } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback((type, message) => {
    const id = Math.random();

    setNotifications((prev) => [
      ...prev,
      { id, type, message },
    ]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 2000);
  }, []);

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
