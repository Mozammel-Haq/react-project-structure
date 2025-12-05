/**
 * src/App.jsx
 * 
 * THE ROOT COMPONENT
 * ------------------
 * This component acts as the shell of our application.
 * It typically holds:
 * 1. The main Router (resolving URLs to Pages).
 * 2. Global UI elements that sit 'above' pages (like Toast Notifications, Modals).
 */

import NotificationContainer from "./components/NotificationContainer"
import AppRouter from "./router/AppRouter"

const App = () => {
  return (
    <>
    {/* 
       AppRouter handles all the URL routing logic.
       It decides which page (Home, Login, Dashboard) to show based on the browser URL.
    */}
    <AppRouter/>

    {/* 
       NotificationContainer holds the global "Toast" notifications.
       It sits here so it can overlay *on top* of any page executing below.
    */}
    <NotificationContainer/>
    </>
  )
}

export default App