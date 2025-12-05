import { useState, useMemo } from "react";

// Mock Data
const ENROLLED_COURSES = [
    { id: 1, title: "React Fundamentals", category: "Frontend", progress: 80 },
    { id: 2, title: "Advanced Hooks", category: "Frontend", progress: 20 },
    { id: 3, title: "Node.js Basics", category: "Backend", progress: 0 },
    { id: 4, title: "MongoDB Mastery", category: "Backend", progress: 50 },
    { id: 5, title: "UI/UX Principles", category: "Design", progress: 100 },
];

const MyLearning = () => {
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("progress");

    // DEMONSTRATION: useMemo
    // Filtering and sorting can be expensive if the list is huge.
    // useMemo ensures this logic only re-runs when 'filter' or 'sortBy' changes,
    // not when other unrelated state changes (like if we had a counter).
    const processedCourses = useMemo(() => {
        // console.log("Processing courses..."); // Uncomment to see when this runs
        
        let result = ENROLLED_COURSES;

        // 1. Filter
        if (filter !== "All") {
            result = result.filter(c => c.category === filter);
        }

        // 2. Sort
        result = [...result].sort((a, b) => {
            if (sortBy === "progress") {
                return b.progress - a.progress; // High to low
            }
            return a.title.localeCompare(b.title); // A-Z
        });

        return result;
    }, [filter, sortBy]); // Dependencies

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Learning</h1>

            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4 justify-between">
                <div>
                    <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">Category:</span>
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="All">All</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Design">Design</option>
                    </select>
                </div>
                <div>
                    <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                         className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="progress">Progress %</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {processedCourses.map(course => (
                    <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                         <div className="flex justify-between items-start">
                             <div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    course.category === 'Frontend' ? 'bg-blue-100 text-blue-800' :
                                    course.category === 'Backend' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                                }`}>
                                    {course.category}
                                </span>
                                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">{course.title}</h3>
                             </div>
                             {course.progress === 100 && (
                                 <span className="text-xl">✅</span>
                             )}
                         </div>

                         <div className="mt-4">
                             <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                 <span>Progress</span>
                                 <span>{course.progress}%</span>
                             </div>
                             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                             </div>
                         </div>
                    </div>
                ))}

                {processedCourses.length === 0 && (
                    <p className="text-gray-500">No courses found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default MyLearning;
