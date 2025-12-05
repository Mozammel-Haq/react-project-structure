/**
 * src/router/ProtectedRoute.jsx
 * 
 * SECURITY CHECKPOINT COMPONENT
 * -----------------------------
 * This component acts as a wrapper (or "Guard") for pages that require login.
 * It checks the user's authentication status before rendering the children.
 * 
 * LOGIC:
 * 1. Is user logged in? If NO -> Redirect to Login.
 * 2. Does user have the right role? (e.g. Admin) If NO -> Redirect to Home.
 * 3. If YES to both -> Render the requested page.
 */

import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  // 1. Loading State
  // We need to wait for the initial "Am I logged in?" check to finish.
  // Otherwise, we might accidentally redirect a valid user to login.
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  // 2. Authentication Check
  if (!user) {
    // If not logged in, redirect to /login.
    // 'state={{ from: location }}' saves the current URL. 
    // The Login page can use this to redirect them back after successful login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Authorization (Role) Check
  // allowedRoles might be [1] (Admin only).
  // If the user's role is not in the allowed list, deny access.
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role_id)) {
      // User is logged in but unauthorized. Send them to a safe place (Home).
      return <Navigate to="/" replace />;
  }

  // 4. Access Granted
  // Render the protected page (children).
  return children;
};

export default ProtectedRoute;
