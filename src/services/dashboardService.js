import api from "./api";

// API call
export const getDashboardStats = async () => {
  // try {
  //   const res = await api.get("/dashboard/stats");
  //   return res.data;
  // } catch (err) {
  //   console.error("getDashboardStats error:", err.message || err);
  return {
    totalUsers: 0,
    totalSales: 0,
    activeProjects: 0,
  };
  // }
};

export const getRecentActivity = async () => {
  try {
    const res = await api.get("/activitylog/");
    return res.data.activity_log;
  } catch (err) {
    console.error("getRecentActivity error:", err.message || err);
    return [];
  }
};
