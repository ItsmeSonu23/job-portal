/**
 * Form Validation Service
 * 
 * Provides validation functions for signup and login forms.
 * Returns validation error messages or null if valid.
 */

/**
 * Validates signup form fields
 * 
 * Performs validation on name, email and password fields for user registration
 * 
 * @param {string} name - Field name to validate ('name', 'email', or 'password')
 * @param {string} value - Field value to validate
 * @returns {string|null} Validation error message if invalid, null if valid
 * 
 * Validation Rules:
 * - Name: Required
 * - Email: Required, must be valid email format
 * - Password: Required, must be 8-15 chars with uppercase, lowercase, number and special char
 * 
 * @example
 * const nameError = signupValidation('name', ''); 
 * // Returns "Name is required"
 * 
 * const emailError = signupValidation('email', 'invalid@email');
 * // Returns "Email is not valid"
 * 
 * const passwordError = signupValidation('password', 'weak');
 * // Returns password requirements error
 */
export const signupValidation = (name: string, value: string) => {
    switch (name) {
        case "name":
            if (value.length === 0) return "Name is required";
            return null;

        case "email":
            if (value.length === 0) return "Email is required";
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "Email is not valid";
            return null;

        case "password":
            if (value.length === 0) return "Password is required";
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,15}$/.test(value)) return "Password must be 8-15 characters with an uppercase, lowercase, special character, and number.";
            return null;

        default:
            return null;
    }
};

/**
 * Validates login form fields
 * 
 * Performs basic required field validation for login form
 * 
 * @param {string} name - Field name to validate ('email' or 'password')
 * @param {string} value - Field value to validate
 * @returns {string|null} Validation error message if invalid, null if valid
 * 
 * Validation Rules:
 * - Email: Required
 * - Password: Required
 * 
 * @example
 * const emailError = loginValidation('email', '');
 * // Returns "Email is required"
 * 
 * const passwordError = loginValidation('password', '');
 * // Returns "Password is required"
 */
export const loginValidation = (name: string, value: string) => {
    switch (name) {
        case "email":
            if (value.length === 0) return "Email is required";
            return null;

        case "password":
            if (value.length === 0) return "Password is required";
            return null;

        default:
            return null;
    }
};