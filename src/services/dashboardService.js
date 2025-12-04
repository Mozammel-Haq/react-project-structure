export const getDashboardStats= async()=>{
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            resolve({
                totalUsers: 50,
                totalSales: 4500,
                activeProjects: 6
            });
            reject(new Error("Failed to fetch stats"))
        },100)
    })
}

export const getRecentActivity = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, activity: "User John Doe created a new project" },
        { id: 2, activity: "Project X was marked completed" },
        { id: 3, activity: "User Jane updated profile" },
      ]);
    }, 100);
  });
};
