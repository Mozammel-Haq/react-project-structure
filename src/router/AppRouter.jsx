/**
 * src/router/AppRouter.jsx
 * 
 * ROUTING CONFIGURATION
 * ---------------------
 * This file defines the "Map" of our application.
 * It connects URLs (like /login or /dashboard) to React Components.
 * 
 * STRUCTURE:
 * 1. BrowserRouter: The top-level router wrapper.
 * 2. Routes: A container for definitions.
 * 3. Route: Individual mapping rules.
 *    - path: The URL pattern
 *    - element: The component to render
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORT PAGES
// We import all the 'Page' components that represent full screens in our app.
import Home from "../pages/public/Home";
import Courses from "../pages/public/Courses";
import CourseDetails from "../pages/public/CourseDetails";
import About from "../pages/public/About";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// IMPORT DASHBOARD PAGES
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardProfile from "../pages/dashboard/DashboardProfile";
import DashboardSettings from "../pages/dashboard/DashboardSettings";
import MyLearning from "../pages/dashboard/MyLearning";
import UserManagement from "../pages/dashboard/UserManagement";

// IMPORT LAYOUTS
// Layouts wrapper pages with common UI like Sidebars or Navbars.
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import PublicLayout from "../layouts/PublicLayout";

// IMPORT GUARDS
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      {/* 
         Routes Container: 
         Ensures only ONE route is rendered at a time (exclusive matching).
      */}
      <Routes>

        {/* 
           PUBLIC ROUTES GROUP
           -------------------
           These routes share the 'PublicLayout' (Navbar + Footer).
           The 'element' prop acts as a wrapper for nested routes.
        */}
        <Route element={<PublicLayout />}>
          {/* path="/" is the exact home page */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          {/* :id is a URL Parameter. accessing /courses/123 will set id="123" */}
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 
           PROTECTED ROUTES GROUP
           ----------------------
           These routes require authentication. We wrap them in <ProtectedRoute>.
           If the check passes, we render <DashboardLayout> which has the Sidebar.
        */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            {/* 
               NESTED ROUTES
               These paths are relative to "/dashboard".
               Example: "home" becomes "/dashboard/home"
            */}
            <Route path="home" element={<DashboardHome/>} />
            <Route path="learning" element={<MyLearning/>} />
            <Route path="profile" element={<DashboardProfile/>} />
            <Route path="settings" element={<DashboardSettings/>} />
            
            {/* 
               ROLE-BASED PROTECTED ROUTE
               Here we nest ANOTHER ProtectedRoute to enforce strict role checks.
               allowedRoles={[1]} means strictly Admin users.
            */}
             <Route 
                path="users" 
                element={
                    <ProtectedRoute allowedRoles={[1]}>
                        <UserManagement/>
                    </ProtectedRoute>
                } 
            />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default AppRouter;
