import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import useToggle from "../../hooks/useToggle";

const DashboardLayout = () => {
    // We use our custom hook to manage the sidebar state on mobile
    const [isSidebarOpen, toggleSidebar, , closeSidebar] = useToggle(false);

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Wrapper */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />

                <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
                    {/* The specific page (Overview, Profile, etc.) renders here */}
                    <Outlet />
                    
                    {/* If we wanted a sticky overlay on mobile when sidebar is open, we handle it in Sidebar component */}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
