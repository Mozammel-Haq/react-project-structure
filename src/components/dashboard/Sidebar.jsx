/**
 * src/components/dashboard/Sidebar.jsx
 * 
 * CONDITIONAL LAYOUT UI
 * ---------------------
 * Demonstrates:
 * 1. Responsive Sidebar (Sticky + Mobile Drawer).
 * 2. Role-Based Navigation Rendering (Admin vs Student links).
 * 3. Active Link Styling (NavLink).
 */

import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useUser();
    
    // 1. DYNAMIC NAVIGATION
    // Start with common routes available to everyone
    const navItems = [
        { name: "Overview", path: "/dashboard/home", icon: "📊" },
        { name: "My Learning", path: "/dashboard/learning", icon: "📚" },
        { name: "Profile", path: "/dashboard/profile", icon: "👤" },
        { name: "Settings", path: "/dashboard/settings", icon: "⚙️" },
    ];

    // 2. ROLE CHECK
    // If Admin (role_id === 1), append extra menu items.
    if (user?.role_id === 1) { 
        navItems.push({ name: "User Management", path: "/dashboard/users", icon: "👥" });
    }

    return (
        <>
            {/* MOBILE OVERLAY: Dimmed background when menu is open on phone */}
            <div 
                className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity z-20 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            ></div>

            {/* SIDEBAR COMPONENT */}
            <aside 
                className={`
                    fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
                    transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* BRANDING */}
                <div className="flex items-center justify-center h-16 bg-blue-600 dark:bg-blue-800 text-white font-bold text-xl tracking-wider shadow-md">
                    SKILLSPHERE
                </div>

                {/* NAV LINKS */}
                <nav className="mt-5 px-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `
                                group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors
                                ${isActive 
                                    ? 'bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'}
                            `}
                        >
                            <span className="mr-3 text-xl">{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* USER PROFILE SNIPPET (BOTTOM) */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
                     <div className="flex items-center">
                        <div className="flex-shrink-0">
                             <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                {user?.name?.charAt(0) || "U"}
                             </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {/* Display Role Label */}
                                {user?.role_id === 1 ? 'Administrator' : 'Student'}
                            </p>
                        </div>
                     </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
