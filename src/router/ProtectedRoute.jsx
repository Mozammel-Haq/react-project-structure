import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  const { notify } = useNotification()

  useEffect(() => {
    if (!user && !loading) {
      notify.error('Logout Success');
    }
  }, [user, loading, notify]);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
