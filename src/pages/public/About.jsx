const About = () => {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">About Skillsphere</h2>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    The ultimate React Learning Sandbox.
                </p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto prose prose-blue dark:prose-invert">
                <p>
                    SkillSphere is designed to be a comprehensive reference architecture for React applications. 
                    It moves beyond simple "ToDo Apps" to demonstrate how production-grade applications are structured.
                </p>
                <h3>What you will learn:</h3>
                <ul>
                    <li><strong>Authentication Flows:</strong> Login, Register, JWT handling, and Protected Routes.</li>
                    <li><strong>Global State Management:</strong> Using Context API efficiently without Redux.</li>
                    <li><strong>Performance Optimization:</strong> Real-world examples of <code>useMemo</code> and <code>useCallback</code>.</li>
                    <li><strong>Custom Hooks:</strong> How to abstract logic into reusable functions like <code>useFetch</code> and <code>useForm</code>.</li>
                    <li><strong>Modern UI/UX:</strong> implementing Dark Mode and Responsive Design with Tailwind CSS.</li>
                </ul>
                <p>
                    Feel free to explore the <code>src</code> folder. Every file is commented to explain the "Why" behind the code.
                </p>
            </div>
        </div>
    );
};

export default About;
