/**
 * src/pages/public/Courses.jsx
 * 
 * THE COURSE LISTING PAGE
 * -----------------------
 * Demonstrates a standard "Data Fetching" pattern.
 * 1. Loading State (Skeletons)
 * 2. Error State (Retry Button)
 * 3. Success State (Grid of Cards)
 */

import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Courses = () => {
    // USAGE OF CUSTOM HOOK:
    // We pass the URL ("/courses").
    // We get back 4 things: data, loading, error, and a function to run it again (refetch).
    // This removes ALL useEffect/useState boilerplate from this component!
    const { data: courses, loading, error, refetch } = useFetch("/courses");

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Available Courses
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
                        Explore our comprehensive library of React tutorials.
                    </p>
                </div>

                {/* 
                   STATE 1: LOADING 
                   Display "Skeleton" placeholders while we wait for data.
                   This reduces layout partial shifting and looks professional.
                */}
                {loading && (
                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                                {/* Gray box mocks */}
                                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 
                   STATE 2: ERROR
                   Something went wrong? Tell the user and give them a way to fix it.
                */}
                {error && (
                    <div className="mt-12 text-center">
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-md inline-block">
                            <p>Error loading courses: {error}</p>
                            <button 
                                onClick={refetch}
                                className="mt-2 text-sm font-bold underline hover:no-underline"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* 
                   STATE 3: SUCCESS (DATA)
                   Render the actual list of courses.
                */}
                {!loading && !error && courses && (
                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div key={course.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex-shrink-0">
                                    <img 
                                        className="h-48 w-full object-cover" 
                                        src={course.image} 
                                        alt={course.title} 
                                    />
                                </div>
                                <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            Programming
                                        </p>
                                        <div className="block mt-2">
                                            <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {course.title}
                                            </p>
                                            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                                                {course.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                            ${course.price}
                                        </div>
                                        <Link 
                                            to={`/courses/${course.id}`} // Dynamic Route Parameter
                                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
