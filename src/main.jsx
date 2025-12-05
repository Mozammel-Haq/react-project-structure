import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
        <App /> 
        </NotificationProvider>
      </ThemeProvider>
      </UserProvider>
  </React.StrictMode>
);
