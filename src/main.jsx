import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
        <App /> 
        </NotificationProvider>
      </UserProvider>
      </ThemeProvider>
  </React.StrictMode>
);
