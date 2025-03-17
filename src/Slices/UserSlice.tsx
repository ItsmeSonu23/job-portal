import { createSlice } from '@reduxjs/toolkit'
import { getItem, removeItem, setItem } from '../Services/LocalStorageService'

/**
 * User Redux Slice
 * 
 * Manages user authentication state in Redux store with local storage persistence.
 * 
 * State Shape:
 * - Initial state loaded from local storage "user" key
 * - Can be null (logged out) or contain user data object
 * 
 * Actions:
 * @action setUser
 * - Sets the current user and persists to local storage
 * - Used for login and user data updates
 * - Syncs Redux state with local storage
 * @param {Object} action.payload - User data to store
 * 
 * @action removeUser
 * - Removes user data from both store and local storage
 * - Used for logout functionality
 * - Sets state to null
 * 
 * Local Storage Integration:
 * - Uses LocalStorageService for data persistence
 * - Keeps user logged in across page refreshes
 * - Syncs storage and Redux state
 * 
 * Usage:
 * ```ts
 * // Login user
 * dispatch(setUser({
 *   id: "123",
 *   name: "John Doe",
 *   email: "john@example.com"
 * }))
 * 
 * // Logout user
 * dispatch(removeUser())
 * ```
 * 
 * Integration:
 * - Uses LocalStorageService for persistence
 * - Exported actions can be dispatched from components
 * - Reducer handles state updates in store
 */
const UserSlice = createSlice({
    name: "user",
    initialState: getItem("user"),
    reducers: {
        setUser: (state, action) => {
            setItem("user", action.payload)
            state = getItem("user")
            return state;
        },
        removeUser: (state) => {
            removeItem("user")
            removeItem("token")
            state = null
            return state;
        }
    }
});

export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
