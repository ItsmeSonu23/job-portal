/**
 * Local Storage Service
 * 
 * Provides utility functions for interacting with browser's localStorage API.
 * Handles JSON serialization/deserialization and error cases.
 */

/**
 * Stores a value in localStorage with JSON serialization
 * 
 * @param {string} key - The key to store the value under
 * @param {any} value - The value to store (will be JSON stringified)
 * 
 * @example
 * // Store user data
 * setItem("user", {
 *   id: 123,
 *   name: "John Doe"
 * })
 * 
 * // Store simple value
 * setItem("theme", "dark")
 */
export const setItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Retrieves and parses a value from localStorage
 * 
 * Handles several edge cases:
 * - Missing items (returns null)
 * - "undefined" string values (returns null) 
 * - Invalid JSON (logs error, returns null)
 * 
 * @param {string} key - The key to retrieve
 * @returns {any|null} The parsed value if found and valid, null otherwise
 * 
 * @example
 * const user = getItem("user")
 * if (user) {
 *   // Use user data
 * } else {
 *   // Handle missing user case
 * }
 */
export const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    if (item && item !== "undefined") { // Check for "undefined" as a string
        try {
            return JSON.parse(item);
        } catch (e) {
            console.error(`Error parsing JSON for key ${key}:`, e);
            return null;
        }
    }
    return null; // Return null if the item is not found, or it's "undefined"
};

/**
 * Removes an item from localStorage
 * 
 * @param {string} key - The key to remove
 * 
 * @example
 * // Remove user data on logout
 * removeItem("user")
 */
export const removeItem = (key: string) => {
    localStorage.removeItem(key)
}