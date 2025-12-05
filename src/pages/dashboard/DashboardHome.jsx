import { useEffect, useState } from "react";
import { getDashboardStats, getRecentActivity } from "../../services/dashboardService";
import { useNotification } from "../../contexts/NotificationContext";
import StatBox from "../../components/StatBox";
import Card from "../../components/ui/Card"; 
import Button from "../../components/ui/Button"; 
import { FiUsers, FiArchive, FiDollarSign } from "react-icons/fi";
function Home() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getDashboardStats();
        const activityData = await getRecentActivity();
        setActivities(activityData);
        setStats(statsData);
        notify.success("Dashboard loaded successfully!");
      } catch (err) {
        notify.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [notify]);
  console.log(stats)
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-700 dark:text-gray-300">Loading dashboard...</p>
      </div>
    );
  
  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatBox title="Total Users" value={stats.totalUsers} icon={FiUsers}/>
        <StatBox title="Total Sales" value={`$${stats.totalSales}`} icon={FiDollarSign}/>
        <StatBox title="Active Projects" value={stats.activeProjects} icon={FiArchive} />
      </div>

      {/* Quick Actions Section */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Quick Actions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create or manage your dashboard entities quickly.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="primary">Add User</Button>
            <Button variant="secondary">Add Project</Button>
          </div>
        </div>
      </Card>

      {/* Recent Activity / Placeholder */}
      <Card>
  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
    Recent Activity
  </h3>
  <ul className="space-y-2">
    {activities.map((act,i) => (
      <li key={act.id} className="text-gray-600 dark:text-gray-400">
        {++i} - {act.action}
      </li>
    ))}
  </ul>
</Card>

    </div>
  );
}

export default Home;
