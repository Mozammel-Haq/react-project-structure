/**
 * src/components/shared/PublicNavbar.jsx
 * 
 * RESPONSIVE NAVBAR
 * -----------------
 * Handles navigation for public pages.
 * Features:
 * 1. Responsive: Collapses into a hamburger menu on mobile.
 * 2. Theme Toggle: Switches between Light/Dark mode.
 * 3. Auth Aware: Shows Login/Register OR Dashboard/Logout based on user state.
 */

import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useTheme } from "../../contexts/ThemeContext";
import useToggle from "../../hooks/useToggle";

const PublicNavbar = () => {
    // Access Global Contexts
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  // Custom Hook: Handles boolean state for Mobile Menu
  // [state, toggleFunction]
  const [isMenuOpen, toggleMenu] = useToggle(false);
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                SkillSphere
              </span>
            </Link>
          </div>

          {/* 
             DESKTOP NAVIGATION 
             Hidden on mobile (md:hidden), Flex on Desktop (md:flex)
          */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/about">About</NavLink>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* CONDITIONAL AUTH BUTTONS */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard/home"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* 
             MOBILE MENU BUTTON 
             Visible on mobile (md:hidden)
          */}
          <div className="flex items-center md:hidden">
            <button
                onClick={toggleTheme}
                className="mr-4 p-2 text-gray-600 dark:text-gray-300"
            >
                 {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="sr-only">Open menu</span>
              {/* Hamburger Icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 
         MOBILE MENU DROPDOWN
         Rendered only if isMenuOpen is true
      */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
            <MobileNavLink to="/courses" onClick={toggleMenu}>Courses</MobileNavLink>
            <MobileNavLink to="/about" onClick={toggleMenu}>About</MobileNavLink>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                {user ? (
                    <>
                        <MobileNavLink to="/dashboard/home" onClick={toggleMenu}>Dashboard</MobileNavLink>
                        <button 
                            onClick={() => { handleLogout(); toggleMenu(); }}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                         <MobileNavLink to="/login" onClick={toggleMenu}>Login</MobileNavLink>
                         <MobileNavLink to="/register" onClick={toggleMenu}>Register</MobileNavLink>
                    </>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper components for cleaner code
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-colors"
  >
    {children}
  </Link>
);

export default PublicNavbar;
