import { Outlet, NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useTheme } from "../../contexts/ThemeContext";

function DashboardLayout() {
  const {theme,toggleTheme} = useTheme()
  const { user, logout } = useUser();

  return (
   <div className="flex h-screen bg-gray-500 dark:bg-red-500">
      {/* Sidebar */}
      <div className="w-60 bg-gray-800 dark:bg-red-500 text-white p-4">
        <h2 className="text-xl font-bold">SkillSphere</h2>

        <button
          onClick={toggleTheme}
          className="mt-4 px-3 py-2 bg-gray-700 rounded"
        >
          {theme == "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <button
          onClick={logout}
          className="mt-6 px-3 py-2 bg-red-600 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 text-gray-900 dark:text-gray-100">
        <h3 className="text-2xl">Welcome, {user?.name}</h3>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
