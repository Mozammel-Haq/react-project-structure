import { Outlet } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DasboardHeader from "./DasboardHeader";

function DashboardLayout() {


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}

        <DasboardHeader/>
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
