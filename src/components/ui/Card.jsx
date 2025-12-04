export default function Card({ 
  title, 
  subtitle, 
  actions, 
  children, 
  className = "" 
}) {
  return (
    <div
      className={`
        bg-white/80 dark:bg-gray-900/60
        backdrop-blur-sm
        border border-gray-200 dark:border-gray-800
        rounded-xl shadow-sm
        hover:shadow-md transition-all
        ${className}
      `}
    >
      {/* Header */}
      {(title || subtitle || actions) && (
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Body */}
      <div className="px-5 py-4">
        {children}
      </div>
    </div>
  );
}
