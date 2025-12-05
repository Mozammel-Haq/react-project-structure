import { useState } from "react";
import { IoMdEye,IoMdEyeOff } from "react-icons/io";

export default function Input({
  label,
  name,
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  helper = "",
  iconLeft = null,
  iconRight = null,
  passwordToggle = false,
  ...rest     // captures all other input attributes
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" && passwordToggle
      ? (showPassword ? "text" : "password")
      : type;

  // auto-generate an ID if not provided
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full space-y-1">

      {/* LABEL */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      {/* INPUT WRAPPER */}
      <div
        className={`
          flex items-center 
          border rounded-lg px-3 py-2 shadow-sm
          transition 
          bg-white dark:bg-gray-800 
          border-gray-300 dark:border-gray-700
          focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500
          ${error ? "border-red-500 dark:border-red-600" : ""}
        `}
      >
        {/* LEFT ICON */}
        {iconLeft && <span className="mr-2 text-gray-500">{iconLeft}</span>}

        {/* INPUT FIELD */}
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="current-password"
          className="
            flex-1 bg-transparent focus:outline-none
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
          "
          {...rest}   // allows attributes like required, minLength, etc.
        />

        {/* PASSWORD TOGGLE */}
        {type === "password" && passwordToggle && (
          <button
            type="button"
            className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IoMdEye/> : <IoMdEyeOff/>}
          </button>
        )}

        {/* RIGHT ICON */}
        {iconRight && <span className="ml-2 text-gray-500">{iconRight}</span>}
      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* HELPER TEXT */}
      {helper && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helper}</p>
      )}
    </div>
  );
}
