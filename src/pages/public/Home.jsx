/**
 * src/pages/public/Home.jsx
 * 
 * THE LANDING PAGE
 * ----------------
 * A typical marketing/landing page.
 * It uses standard HTML/Tailwind for layout.
 * No complex logic here, just presentation.
 */

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col">
      {/* 
         HERO SECTION 
         The big banner at the top of the page.
      */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-16 pb-32 space-y-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                {/* TEXT CONTENT */}
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                        <span className="block">Master React with</span>
                        <span className="block text-blue-600 dark:text-blue-400">Real-World Projects</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-l md:mt-5 md:text-xl lg:mx-0">
                        SkillSphere isn't just a platform; it's a "Reference Grade" implementation of a modern React application. 
                        Learn Hooks, Context, Authentication, and Scalable Architecture by exploring this codebase.
                    </p>
                    <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                        {/* Primary CTA */}
                        <Link
                            to="/courses"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all"
                        >
                            Explore Courses
                        </Link>
                        {/* Secondary CTA */}
                        <a
                            href="https://github.com/Mozammel-Haq/react-project-structure"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-all"
                        >
                            View Source
                        </a>
                    </div>
                </div>
                
                {/* DECORATIVE IMAGE (The "Showcase") */}
                <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                    <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity duration-500"></div>
                        <img
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                            alt="Coding workspace"
                        />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 
         FEATURES GRID
         A 3-column layout showing key selling points.
      */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Under the Hood</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Built with Modern React Patterns
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
                    This project demonstrates the "Right Way" to build scalable apps.
                </p>
            </div>

            <div className="mt-10">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard 
                        title="Custom Hooks" 
                        desc="Encapsulated logic with useFetch, useForm, and more for cleaner components."
                        icon="🪝" 
                    />
                    <FeatureCard 
                        title="Context API" 
                        desc="Global state management for Auth, Theme, and Notifications without Redux."
                        icon="🌍" 
                    />
                    <FeatureCard 
                        title="Scalable Structure" 
                        desc="Feature-based folders, services layer, and strict separation of concerns."
                        icon="🏗️" 
                    />
                </div>
            </div>
         </div>
      </section>
    </div>
  );
}

// Simple internal sub-component to avoid repetition
const FeatureCard = ({ title, desc, icon }) => (
    <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg px-6 py-8 hover:shadow-lg transition-shadow">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
)

export default Home;
