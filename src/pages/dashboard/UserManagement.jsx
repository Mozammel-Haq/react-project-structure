/**
 * src/pages/dashboard/UserManagement.jsx
 * 
 * COMPLEX STATE MANAGEMENT (USEREDUCER)
 * -------------------------------------
 * This component demonstrates when to swap `useState` for `useReducer`.
 * 
 * SCENARIO:
 * We have 4 pieces of state that are tightly coupled:
 * 1. The data list (users)
 * 2. The loading status
 * 3. Any error messages
 * 4. The current sort order
 * 
 * UPDATING THEM TOGETHER:
 * With useState, you might need 4 separate set calls.
 * With useReducer, you dispatch ONE action ("FETCH_SUCCESS") and update everything atomically.
 */

import { useReducer, useEffect, useCallback } from "react";
import api from "../../services/api";

// 1. INITIAL STATE
const initialState = {
  users: [],
  loading: false,
  error: null,
  sort: { key: "id", order: "asc" },
};

// 2. THE REDUCER FUNCTION
// Takes current state + an action -> Returns NEW state.
// Must be a pure function.
function userReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      // Reset error, start loading
      return { ...state, loading: true, error: null };
      
    case "FETCH_SUCCESS":
      // Stop loading, save data
      return { ...state, loading: false, users: action.payload };
      
    case "FETCH_ERROR":
      // Stop loading, save error
      return { ...state, loading: false, error: action.payload };
      
    case "SORT":
        // Complex logic: Determine new sort order
        const order =
            state.sort.key === action.payload && state.sort.order === "asc"
            ? "desc"
            : "asc";
        
        // Create a copy of array to sort (never mutate state directly!)
        const sortedUsers = [...state.users].sort((a, b) => {
             if (a[action.payload] < b[action.payload]) return order === "asc" ? -1 : 1;
             if (a[action.payload] > b[action.payload]) return order === "asc" ? 1 : -1;
             return 0;
        });

      return { 
          ...state, 
          sort: { key: action.payload, order },
          users: sortedUsers
      };
      
    case "DELETE_USER":
        return {
            ...state,
            users: state.users.filter(u => u.id !== action.payload)
        }
        
    default:
      return state;
  }
}

const UserManagement = () => {
    // 3. INITIALIZE USE REDUCER
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        // Trigger fetch start
        dispatch({ type: "FETCH_START" });
        
        // Mock API call to simulate fetching users
        setTimeout(() => {
            const mockUsers = [
                { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin" },
                { id: 2, name: "John Doe", email: "john@example.com", role: "Student" },
                { id: 3, name: "Jane Smith", email: "jane@test.com", role: "Student" },
                { id: 4, name: "Bob Wilson", email: "bob@test.com", role: "Instructor" },
            ];
            dispatch({ type: "FETCH_SUCCESS", payload: mockUsers });
        }, 1000);
    }, []);

    // useCallback ensures 'handleSort' doesn't recreate on every render,
    // which helps performance if we pass it to child components.
    const handleSort = useCallback((key) => {
        dispatch({ type: "SORT", payload: key });
    }, []);

    const handleDelete = (id) => {
        if(window.confirm("Are you sure?")) {
            dispatch({ type: "DELETE_USER", payload: id});
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50 dark:bg-gray-700">
                <div>
                     <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">User Management</h3>
                     <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">Admin only view. Demonstrates <code>useReducer</code>.</p>
                </div>
            </div>

            <div className="min-w-full">
                {state.loading && <div className="p-4 text-center text-gray-500">Loading users...</div>}
                
                {!state.loading && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <SortableHeader label="ID" sortKey="id" currentSort={state.sort} onSort={handleSort} />
                                    <SortableHeader label="Name" sortKey="name" currentSort={state.sort} onSort={handleSort} />
                                    <SortableHeader label="Email" sortKey="email" currentSort={state.sort} onSort={handleSort} />
                                    <SortableHeader label="Role" sortKey="role" currentSort={state.sort} onSort={handleSort} />
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                                {state.users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                user.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

// Internal Sub-component for interactive headers
const SortableHeader = ({ label, sortKey, currentSort, onSort }) => (
    <th 
        scope="col" 
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
        onClick={() => onSort(sortKey)}
    >
        <div className="flex items-center">
            {label}
            {/* Show Arrow if this column is sorted */}
            {currentSort.key === sortKey && (
                <span className="ml-1">{currentSort.order === 'asc' ? '↑' : '↓'}</span>
            )}
        </div>
    </th>
);

export default UserManagement;
