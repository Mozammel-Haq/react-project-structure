/**
 * src/pages/public/CourseDetails.jsx
 * 
 * COMPLEX UI: COURSE PLAYER
 * -------------------------
 * This is one of the most complex pages. It demonstrates:
 * 1. Nested Data Structures (Course -> Modules -> Submodules)
 * 2. Polymorphic Logic (Free vs Locked content)
 * 3. Accordion State Management
 * 4. Active Selection State
 */

import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Button from "../../components/ui/Button";

// MOCK DATA (Nested Structure)
const MOCK_COURSE = {
    id: 1,
    title: "Advanced React Patterns",
    description: "Master the art of building scalable React applications.",
    instructor: "Jubaer Ahmed",
    level: "Advanced",
    duration: "10h 30m",
    students: 1250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    modules: [
        { 
            id: 1, 
            title: "Module 1: Foundations", 
            duration: "1h 00m",
            submodules: [
                { id: "1-1", title: "Introduction (Unlocked)", duration: "15m", isFree: true, type: "video" },
                { id: "1-2", title: "React Architecture", duration: "45m", isFree: false, type: "video" }
            ]
        },
        { 
            id: 2, 
            title: "Module 2: Advanced Hooks", 
            duration: "55m",
            submodules: [
                { id: "2-1", title: "The 'useCustomHook' Mindset", duration: "25m", isFree: false, type: "video" },
                { id: "2-2", title: "Complex State with useReducer", duration: "30m", isFree: false, type: "video" }
            ]
        },
        { 
            id: 3, 
            title: "Module 3: Performance", 
            duration: "2h 00m",
            submodules: [
                { id: "3-1", title: "Understanding Re-renders", duration: "45m", isFree: false, type: "video" },
                { id: "3-2", title: "useMemo vs useCallback", duration: "45m", isFree: false, type: "video" },
                { id: "3-3", title: "Code Splitting", duration: "30m", isFree: false, type: "video" }
            ]
        },
    ]
};

const CourseDetails = () => {
    // 1. Get Params: accessing /courses/:id
    const { id } = useParams();
    const { user } = useUser();
    const location = useLocation();
    
    // 2. Component State
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Accordion State: Which module folder is expanded?
    const [expandedModuleId, setExpandedModuleId] = useState(null);
    
    // Player State: Which specific video is active?
    const [activeSubmodule, setActiveSubmodule] = useState(null);

    // 3. Fetch Data
    useEffect(() => {
        window.scrollTo(0, 0);
        // Simulate API call
        const timer = setTimeout(() => {
            setCourse(MOCK_COURSE);
            setLoading(false);
            
            // UX Enhancement: Auto-open the first module and play the first video
            if (MOCK_COURSE.modules?.length > 0) {
                setExpandedModuleId(MOCK_COURSE.modules[0].id);
                if (MOCK_COURSE.modules[0].submodules?.length > 0) {
                    setActiveSubmodule(MOCK_COURSE.modules[0].submodules[0]);
                }
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [id]);

    // Accordion Helper
    const toggleModule = (moduleId) => {
        // Use functional state? Not necessary here since we iterate the list
        // Toggle: If open, close it. If closed, open it.
        setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
    };

    // ACCESS LOGIC: The Core Business Rule
    const isSubmoduleAccessible = (submodule) => {
        // It is accessible IF: It's marked 'isFree' OR the user is logged in.
        return submodule.isFree || user;
    };

    if (loading) {
        return (
             <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
             </div>
        );
    }

    if (!course) return <div>Course not found</div>;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12 transition-colors duration-300">
            {/* HERO HEADER */}
            <div className="bg-blue-600 dark:bg-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                         <span className="inline-block px-3 py-1 rounded-full bg-blue-500 bg-opacity-50 text-xs font-semibold tracking-wide uppercase mb-4">
                            {course.level} Course
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
                            {course.title}
                        </h1>
                        <p className="text-xl text-blue-100 mb-6">
                            {course.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm font-medium">
                            <span className="flex items-center"><span className="mr-2">👨‍🏫</span> {course.instructor}</span>
                            <span className="flex items-center"><span className="mr-2">⏱️</span> {course.duration}</span>
                            <span className="flex items-center"><span className="mr-2">👥</span> {course.students} Students</span>
                            <span className="flex items-center"><span className="mr-2">⭐</span> {course.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: PLAYER AREA */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                            {activeSubmodule && (
                                <div className="aspect-w-16 aspect-h-9 bg-gray-900 flex items-center justify-center relative group">
                                    {/* CONDITIONAL PLAYER RENDER */}
                                    {isSubmoduleAccessible(activeSubmodule) ? (
                                        // 🔓 UNLOCKED: Show video (simulated)
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white p-12 text-center bg-gray-800 min-h-[400px]">
                                             <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                                                <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                             </div>
                                             <h3 className="text-xl font-bold">{activeSubmodule.title}</h3>
                                             <p className="text-gray-400 mt-2">Video/Content Placeholder</p>
                                        </div>
                                    ) : (
                                        // 🔒 LOCKED: Show "Paywall" / Login Prompt
                                        <div className="absolute inset-0 bg-gray-900/90 flex flex-col items-center justify-center z-10 backdrop-blur-sm p-8 text-center min-h-[400px]">
                                            <div className="bg-gray-800 p-4 rounded-full mb-4 shadow-lg border border-gray-700">
                                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">This content is locked</h3>
                                            <p className="text-gray-300 mb-6">Join SkillSphere to access all premium modules.</p>
                                            <div className="flex space-x-4">
                                                <Link to="/login" state={{ from: location.pathname }}>
                                                    <Button variant="primary" size="lg">Login</Button>
                                                </Link>
                                                <Link to="/register">
                                                    <Button variant="secondary" size="lg">Sign Up</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{activeSubmodule?.title}</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {isSubmoduleAccessible(activeSubmodule) 
                                        ? "This is the description for the currently selected submodule. Watch the video to learn more."
                                        : "Content locked. Please authenticate to view."}
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* RIGHT COLUMN: MODULE LIST (ACCORDION) */}
                    <div className="space-y-6">
                         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                <h3 className="font-bold text-gray-900 dark:text-white">Course Syllabus</h3>
                            </div>

                            <div className="divide-y divide-gray-200 dark:divide-gray-600">
                                {/* Iterate over Modules */}
                                {course.modules.map((module) => (
                                    <div key={module.id} className="bg-white dark:bg-gray-800">
                                        {/* Module Header (Clickable for Expand) */}
                                        <button 
                                            onClick={() => toggleModule(module.id)}
                                            className="w-full text-left px-4 py-3 flex justify-between items-center bg-gray-50/50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                                        >
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{module.title}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{module.duration}</p>
                                            </div>
                                            <span className="text-gray-400">
                                                {expandedModuleId === module.id ? '−' : '+'}
                                            </span>
                                        </button>

                                        {/* Submodules List (Expanded Only) */}
                                        {expandedModuleId === module.id && (
                                            <ul className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                                {module.submodules.map((sub, idx) => {
                                                    const isActive = activeSubmodule?.id === sub.id;
                                                    const isLocked = !isSubmoduleAccessible(sub);

                                                    return (
                                                        <li 
                                                            key={sub.id}
                                                            onClick={() => setActiveSubmodule(sub)}
                                                            className={`
                                                                relative px-4 py-3 cursor-pointer flex items-center justify-between transition-colors
                                                                ${isActive 
                                                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                                                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'}
                                                            `}
                                                        >
                                                            <div className="flex items-center">
                                                                <span className="text-xs mr-3 opacity-70">{idx + 1}</span>
                                                                <span className="text-sm font-medium">{sub.title}</span>
                                                            </div>
                                                            <div className="flex items-center text-xs opacity-70">
                                                                <span className="mr-2">{sub.duration}</span>
                                                                
                                                                {isLocked ? (
                                                                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                                ) : (
                                                                     <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/></svg>
                                                                )}
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
