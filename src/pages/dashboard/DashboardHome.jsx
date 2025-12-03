import { useEffect, useState } from "react"
import { getDashboardStats } from "../../services/dashboardService";
import { useNotification } from "../../contexts/NotificationContext"
import StatBox from "../../components/Statbox"

const DashboardHome = () => {

  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const {notify} =useNotification()

  useEffect(()=>{
     const fetchData = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
        notify.success("Dashboard loaded successfully!");
      } catch (err) {
        notify.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[notify])

 if (loading) return <div>Loading dashboard...</div>;
 return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatBox title="Total Users" value={stats.totalUsers} />
        <StatBox title="Total Sales" value={`$${stats.totalSales}`} />
        <StatBox title="Active Projects" value={stats.activeProjects} />
      </div>
    </div>
  );
}

export default DashboardHome