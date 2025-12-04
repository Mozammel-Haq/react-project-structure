export default function StatBox({ title, value, icon: Icon }) {
  return (
    <div className="
      bg-white/80 dark:bg-gray-900/60 
      backdrop-blur-sm 
      border border-gray-200 dark:border-gray-800 
      rounded-xl p-5 shadow-sm 
      hover:shadow-md transition-all 
      flex items-center gap-4
    ">
      
      {/* Icon Container */}
      {Icon && (
        <div className="
          w-12 h-12 
          rounded-lg 
          bg-linear-to-br from-indigo-500 to-purple-500 
          text-white flex items-center justify-center 
          shadow
        ">
          <Icon size={24} />
        </div>
      )}

      {/* Text Section */}
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {title}
        </p>

        <h2 className="
          text-3xl font-semibold 
          text-gray-900 dark:text-white mt-1
        ">
          {value}
        </h2>
      </div>
    </div>
  );
}
