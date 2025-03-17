import { createSlice } from '@reduxjs/toolkit'
import { updateProfile } from '../Services/ProfileService';

/**
 * Profile Redux Slice
 * 
 * Manages the profile state in the Redux store with actions for updating and setting profile data.
 * 
 * State Shape:
 * - Empty object as initial state
 * - Will contain profile data after being populated
 * 
 * Actions:
 * @action changeProfile
 * - Updates profile in both backend and Redux store
 * - Calls updateProfile service with new profile data
 * - Returns new profile state
 * @param {Object} action.payload - New profile data to update
 * 
 * @action setProfile  
 * - Directly sets profile state without backend update
 * - Used for initial profile load and sync
 * @param {Object} action.payload - Profile data to set
 * 
 * Usage:
 * ```ts
 * // Update profile
 * dispatch(changeProfile({
 *   name: "John Doe",
 *   role: "Developer"
 * }))
 * 
 * // Set profile
 * dispatch(setProfile(profileData))
 * ```
 * 
 * Integration:
 * - Uses ProfileService for backend communication
 * - Exported actions can be dispatched from components
 * - Reducer handles state updates in store
 */
const ProfileSlice = createSlice({
    name: "profile",
    initialState: {},
    reducers: {
        changeProfile: (state, action) => {
            state = updateProfile(action.payload)
            return action.payload;
        },
        setProfile: (state, action) => {
            state = action.payload
            return state;
        }
    }
});

export const { changeProfile, setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;