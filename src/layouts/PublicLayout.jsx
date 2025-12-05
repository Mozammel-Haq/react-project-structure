import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/shared/PublicNavbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <PublicNavbar />
      
      {/* 
        Main Content Area
        flex-grow ensures the footer (if added) stays at the bottom 
      */}
      <main className="flex-grow flex flex-col">
        {/* 
            Outlet renders the child route's element (Home, Courses, etc.) 
            We can add page transitions here later if we want.
        */}
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SkillSphere. Built for learning React.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
