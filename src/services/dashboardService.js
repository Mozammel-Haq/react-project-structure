export const getDashboardStats= async()=>{
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            resolve({
                totalUsers: 50,
                totalSales: 4500,
                activeProjects: 6
            });
            reject(new Error("Failed to fetch stats"))
        },1000)
    })
}