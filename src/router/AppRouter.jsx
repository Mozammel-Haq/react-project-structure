import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardProfile from "../pages/dashboard/DashboardProfile";
import DashboardSettings from "../pages/dashboard/DashboardSettings";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected / Dashboard Routes (we will add later) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
                <Route path="home" element={<DashboardHome/>} />
                <Route path="profile" element={<DashboardProfile/>} />
                <Route path="settings" element={<DashboardSettings/>} />
          </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
