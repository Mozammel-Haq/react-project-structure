import { useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";

const DashboardProfile = () => {
    const { user } = useUser();
    // DEMONSTRATION: useRef
    // We use a ref to programmatically focus the input field when the "Edit" button is clicked.
    const nameInputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Setup Form
    const initialValues = {
        name: user?.name || "",
        email: user?.email || "",
        bio: "React developer in training!",
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) errors.name = "Name is required";
        return errors;
    };

    const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);

    const handleEditClick = () => {
        setIsEditing(true);
        // Wait for render to reveal input, then focus
        setTimeout(() => {
            nameInputRef.current?.focus();
        }, 0);
    };

    const onSubmit = (formValues) => {
        // Mock API update
        console.log("Updating profile:", formValues);
        
        // Optimistic UI update simulation
        setTimeout(() => {
            setIsEditing(false);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000); // Clear message
        }, 500);
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
                {!isEditing && (
                    <button 
                        onClick={handleEditClick}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {successMessage && (
                <div className="mb-4 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-md text-sm">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                 {/* Avatar (Static for now) */}
                 <div className="flex items-center space-x-6">
                    <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                        {values.name.charAt(0)}
                    </div>
                     <div>
                         <p className="text-sm text-gray-500 dark:text-gray-400">Role: {user?.role_id === 1 ? 'Administrator' : 'Student'}</p>
                     </div>
                 </div>

                 {/* Name Field */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    {isEditing ? (
                        <input
                            ref={nameInputRef} // ATTACH REF HERE
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2 border"
                        />
                    ) : (
                        <p className="mt-1 text-sm text-gray-900 dark:text-white py-2">{values.name}</p>
                    )}
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                 </div>

                 {/* Email Field (Read Only) */}
                 <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                            type="text"
                            value={values.email}
                            disabled
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed sm:text-sm px-3 py-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
                 </div>

                 {/* Bio Field */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                     {isEditing ? (
                        <textarea
                            name="bio"
                            rows={3}
                            value={values.bio}
                            onChange={handleChange}
                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2 border"
                        />
                     ) : (
                        <p className="mt-1 text-sm text-gray-900 dark:text-white py-2">{values.bio}</p>
                     )}
                 </div>

                 {isEditing && (
                     <div className="flex justify-end space-x-3">
                         <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                         >
                             Cancel
                         </button>
                         <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                         >
                             Save Changes
                         </button>
                     </div>
                 )}
            </form>
        </div>
    );
};

export default DashboardProfile;
