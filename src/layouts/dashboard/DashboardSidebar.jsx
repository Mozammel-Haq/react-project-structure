import { NavLink } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

const DashboardSidebar = () => {
    const {logout} = useUser();
  return (
          <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            SkillSphere
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive
                  ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive
                  ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive
                  ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Settings
          </NavLink>
        </nav>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>
  )
}

export default DashboardSidebar