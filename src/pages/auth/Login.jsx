/**
 * src/pages/auth/Login.jsx
 * 
 * FORM HANDLING EXAMPLE (USEFORM)
 * -------------------------------
 * This page demonstrates how to build a robust form using our custom hook.
 * 
 * KEY CONCEPTS:
 * 1. Form State Management (values, errors) via custom hook.
 * 2. Validation Logic.
 * 3. Auth Integration (UserContext).
 * 4. Redirects (redirecting back to the previous page).
 */

import { useNavigate, useLocation, Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // UX ENHANCEMENT: Redirect History
  // If the user tried to access a protected page (e.g., /dashboard) and was kicked here,
  // 'location.state.from' will hold that URL. We send them back there after login.
  const from = location.state?.from?.pathname || "/dashboard/home";

  // 1. DEFINE VALIDATION RULES
  // This function takes current form values and returns an error object.
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  // 2. INITIALIZE FORM HOOK
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, handleChange, handleSubmit, setErrors } = useForm(
    initialValues,
    validate
  );

  // 3. SUBMIT HANDLER
  // The hook ensures this is ONLY called if validation passes.
  const onSubmit = async (formValues) => {
    try {
      await login(formValues.email, formValues.password);
      // 'replace: true' prevents the user from clicking 'Back' and returning to the login page.
      navigate(from, { replace: true });
    } catch (err) {
      // Handle login failures (401 Unauthorized)
      setErrors({ form: "Invalid email or password" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                start your 14-day free trial
            </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Global Form Error (e.g. Invalid Credentials) */}
            {errors.form && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded text-sm text-center">
                    {errors.form}
                </div>
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  // Conditional styling based on error state
                  className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                />
                {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                />
                 {errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign in
              </button>
            </div>
            
            {/* Demo Credentials Hint */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                    Demo Credentials
                    </span>
                </div>
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Email: admin@example.com</p>
                <p>Password: password123</p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
