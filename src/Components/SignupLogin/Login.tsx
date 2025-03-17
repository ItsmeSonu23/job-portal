import { TextInput, rem, PasswordInput, Button, LoadingOverlay } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { loginValidation } from "../../Services/FormValidation"
import { useDisclosure } from "@mantine/hooks"
import { ResetPassword } from "./ResetPassword"
import { useDispatch } from "react-redux"
import { setUser } from "../../Slices/UserSlice"
import { errorNotification, successNotification } from "../../Services/NotificationService"
import { setJwt } from "../../Slices/JwtSlice"
import { loginUser } from "../../Services/AuthService"
import { jwtDecode } from "jwt-decode"

/**
 * Initial form state with empty email and password
 */
const form = {
    email: "",
    password: "",
}

/**
 * Login Component
 * 
 * Handles user authentication through a login form interface.
 * 
 * @component
 * 
 * Features:
 * - Email and password input fields with validation
 * - Loading state during authentication
 * - Success/Error notifications
 * - Navigation after successful login
 * - Password reset functionality
 * - Links to signup for new users
 * 
 * Visual Elements:
 * - Email input with @ icon
 * - Password input with lock icon
 * - Loading overlay during authentication
 * - Login button with loading state
 * - Links for signup and password reset
 * 
 * Layout:
 * - Centered form layout
 * - Consistent spacing between elements
 * - Responsive width (50% of container)
 * 
 * State:
 * @property {boolean} loading - Controls loading overlay
 * @property {Object} data - Form input values
 * @property {Object} formError - Form validation errors
 * @property {boolean} opened - Controls password reset modal
 * 
 * Redux:
 * - Dispatches user data on successful login
 * 
 * Form Validation:
 * - Email format validation
 * - Password requirements check
 * - Real-time error clearing
 * 
 * API Integration:
 * - Calls loginUser service
 * - Handles success/failure responses
 * - Shows appropriate notifications
 * 
 * Navigation:
 * - Redirects to home page after login
 * - Links to signup page
 * - Opens password reset modal
 * 
 * @returns {JSX.Element} A login form interface
 */
export const Login = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState<{ [key: string]: string }>(form)
    const [formError, setFormError] = useState<{ [key: string]: string }>(form)
    const [opened, { open, close }] = useDisclosure(false);

    /**
     * Handles input changes and clears corresponding error
     * @param {React.ChangeEvent} event - Input change event
     */
    const handleChange = (event: any) => {
        setFormError({ ...form, [event.target.name]: "" })
        setData({ ...data, [event.target.name]: event.target.value })
    }

    /**
     * Handles form submission and authentication
     * Validates inputs, calls login API, and handles response
     */
    const handleSubmit = async () => {
        let valid = true, newFormError: { [key: string]: string } = {};
        for (let key in data) {
            newFormError[key] = loginValidation(key, data[key]);
            if (newFormError[key]) valid = false;
        }
        setFormError(newFormError);
        if (valid) {
            setLoading(true);
            try {
                const res = await loginUser(data);
                successNotification("Login Successful", "Redirecting to Home-page...");
                dispatch(setJwt(res.jwt));
                const decoded = jwtDecode(res.jwt);
                dispatch(setUser({ ...decoded, email: decoded.sub }));
                setTimeout(() => {
                    setLoading(false);
                    navigate("/");
                }, 4000);
            } catch (error) {
                setLoading(false);
                const errorMessage = (error.response?.data?.errorMessage || "Login Failed");
                errorNotification("Login Failed", errorMessage);
            }
        }
    }
    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: "2" }} loaderProps={{ color: "darkorchid", type: "dots" }} />
            <div className="w-1/2 max-smsm:w-full px-20 max-bssm:px-10 max-mdsm:px-5 flex flex-col justify-center gap-5">
                <div className="text-5xl max-bssm:text-4xl max-mdsm:text-3xl max-smsm:text-2xl font-semibold">Login Your Account</div>
                <TextInput error={formError.email} name="email" value={data.email} withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} label="Email" placeholder="Enter your email" onChange={handleChange} />

                <PasswordInput error={formError.password} name="password" value={data.password} withAsterisk leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />} label="Password" placeholder="*********" onChange={handleChange} />

                <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled" color="darkorchid">Login</Button>
                <div className="mx-auto">
                    Don't have an account ? <NavLink to={"/signup"} className="text-[var(--color-electric-violet-500)] hover:underline cursor-pointer max-xssm:text-sm" onClick={() => { setFormError(form); setData(form) }}>Sign up</NavLink>
                </div>
                <div onClick={open} className="text-[var(--color-electric-violet-500)] hover:underline cursor-pointer text-center max-xssm:text-sm">Forgot Password?</div>
            </div>
            <ResetPassword opened={opened} close={close} />
        </>
    )
}