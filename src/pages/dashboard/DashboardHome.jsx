import { useUser } from "../../contexts/UserContext";

const DashboardHome = () => {
    const { user } = useUser();

    // Mock Data for "Overview"
    const stats = [
        { name: 'Courses Enrolled', stat: '5', icon: '📚' },
        { name: 'Hours Learned', stat: '24.5', icon: '⏱️' },
        { name: 'Certificates Earned', stat: '2', icon: '🎓' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {user?.name}!
                </h2>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Here's what's happening with your learning journey today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 transition-transform hover:scale-105 duration-200">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            {item.name}
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                            {item.stat}
                            <span className="text-2xl">{item.icon}</span>
                        </dd>
                    </div>
                ))}
            </div>

            {/* Recent Activity Mockup */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Recent Activity
                    </h3>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                         <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-blue-600 truncate">
                                    Completed Lesson: React Hooks
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Completed
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                     <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        Advanced Hooks Patterns
                                     </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                    <p>2 hours ago</p>
                                </div>
                            </div>
                        </li>
                         <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-blue-600 truncate">
                                   Started Course: Node.js Basics
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        In Progress
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                     <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        Backend Development
                                     </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                    <p>1 day ago</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
