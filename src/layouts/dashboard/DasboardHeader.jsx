import { useTheme } from "../../contexts/ThemeContext";
import { useUser } from "../../contexts/UserContext"
import { FiSun, FiMoon, FiBell, FiUser } from "react-icons/fi";
const DasboardHeader = () => {
    const {user} = useUser()
      const { theme, toggleTheme } = useTheme();
  return (
            <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Welcome Back, {user?.name}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <FiSun className="text-yellow-500 w-5 h-5" />
              ) : (
                <FiMoon className="text-gray-200 w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
              <FiBell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* User Profile */}
            <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
              <FiUser className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </header>
  )
}

export default DasboardHeader