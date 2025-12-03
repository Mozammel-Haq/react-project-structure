const api ={
    get: async(url)=>{
        console.log("API GET Called:",url)
        return Promise.resolve({data:{}})
    },
    post: async(url,payload)=>{
        console.log("API POST called",url,payload)
        return Promise.resolve({data:{}})
    },
}