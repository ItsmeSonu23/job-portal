import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core"
import { IconAt, IconLock} from "@tabler/icons-react"
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";

/**
 * Signup Component
 * 
 * Handles new user registration with form validation and account type selection.
 * 
 * @component
 * 
 * Features:
 * - Full name, email, and password input fields
 * - Password confirmation with matching validation
 * - Account type selection (Applicant/Employer)
 * - Terms & Conditions acceptance
 * - Real-time form validation
 * - Loading state during registration
 * - Success/Error notifications
 * - Navigation after successful signup
 * 
 * Visual Elements:
 * - Input fields with icons
 * - Radio buttons for account type
 * - Loading overlay during registration
 * - Submit button with loading state
 * - Link to login page
 * 
 * Layout:
 * - Centered form layout
 * - Consistent spacing between elements
 * - Responsive width (50% of container)
 * 
 * State:
 * @property {Object} data - Form input values
 *   - name: User's full name
 *   - email: User's email address
 *   - password: User's password
 *   - confirmPassword: Password confirmation
 *   - accountType: Selected account type (APPLICANT/EMPLOYEE)
 * @property {Object} formError - Form validation errors
 * @property {boolean} loading - Controls loading overlay
 * 
 * Form Validation:
 * - Name presence check
 * - Email format validation
 * - Password requirements check
 * - Password matching validation
 * - Real-time error clearing
 * 
 * API Integration:
 * - Calls registerUser service
 * - Handles success/failure responses
 * - Shows appropriate notifications
 * 
 * Navigation:
 * - Redirects to login page after successful registration
 * - Links to login page for existing users
 * 
 * @returns {JSX.Element} A signup form interface
 */
export const Signup = () => {
    const form = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "APPLICANT"
    }
    const navigate = useNavigate()
    const [data, setData] = useState<{ [key: string]: string }>(form)
    const [formError, setFormError] = useState<{ [key: string]: string }>(form)
    const [loading, setLoading] = useState(false)

    /**
     * Handles form input changes and validates in real-time
     * @param {React.ChangeEvent|string} event - Input change event or account type string
     */
    const handleChange = (event: any) => {
        if (typeof (event) == "string") {
            setData({ ...data, accountType: event })
            return;
        }
        let name = event.target.name, value = event.target.value;
        setData({ ...data, [name]: value })
        setFormError({ ...formError, [name]: signupValidation(name, value) })
        if (name == "password" && data.confirmPassword !== "") {
            let err = ""
            if (data.confirmPassword !== value) err = "Password do not match.";
            setFormError({ ...formError, [name]: signupValidation(name, value), confirmPassword: err })
        }
        if (name === "confirmPassword") {
            if (data.password !== value) {
                setFormError({ ...formError, [name]: "Passwords do not match." })
            } else {
                setFormError({ ...formError, confirmPassword: "" })
            }
        }
    }

    /**
     * Handles form submission and user registration
     * Validates all inputs before making API call
     */
    const handleSubmit = () => {
        let valid = true, newFormError: { [key: string]: string } = {};

        for (let key in data) {
            if (key === "accountType") continue;
            if (key !== "confirmPassword") newFormError[key] = signupValidation(key, data[key]);
            else if (data[key] !== data["password"]) newFormError[key] = "Password do not match."
            if (newFormError[key]) valid = false
        }

        setFormError(newFormError)

        if (valid === true) {
            setLoading(true)
            registerUser(data)
                .then((res) => {
                    console.log(res)
                    setData(form)
                    successNotification("Registered SuccessFully", 'Redirecting to login page...')
                    setTimeout(() => {
                        setLoading(false)
                        navigate("/login")
                    }, 4000)
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error)
                    errorNotification("Registered Failed", error.response.data.errorMessage)
                })
        }
    }
    return (
        <>
            <LoadingOverlay className="translate-x-1/2" visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: "2" }} loaderProps={{ color: "darkorchid", type: "dots" }} />

            <div className="w-1/2 max-smsm:w-full max-smsm:py-20 px-20 max-smsm:p-10 max-bssm:px-10 max-mdsm:px-5 flex flex-col justify-center gap-5">
                <div className="text-5xl max-bssm:text-4xl max-mdsm:text-3xl max-smsm:text-2xl font-semibold">Create Account</div>
                <TextInput error={formError.name} withAsterisk name="name" value={data.name} label="Full name" placeholder="Your Name" onChange={handleChange} />
                <TextInput error={formError.email} withAsterisk name="email" value={data.email} leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} label="Email" placeholder="Enter your email" onChange={handleChange} />

                <PasswordInput error={formError.password} name="password" value={data.password} withAsterisk leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />} label="Password" placeholder="*********" onChange={handleChange} />
                <PasswordInput error={formError.confirmPassword} name="confirmPassword" value={data.confirmPassword} withAsterisk leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />} label="Confirm Password" placeholder="*********" onChange={handleChange} />
                <Radio.Group
                    value={data.accountType}
                    onChange={handleChange}
                    label="You are?"
                    withAsterisk
                >
                    <div className="flex gap-6 max-xssm:gap-4">
                        <Radio className="py-4 px-6 max-smsm:py-2 max-smsm:px-4 border has-[:checked]:bg-[var(--color-electric-violet-500)]/5 hover:bg-[var(--color-mine-shaft-900)] border-[var(--color-mine-shaft-800)] rounded-lg has-[:checked]:border-[var(--color-electric-violet-500)]" autoContrast value="APPLICANT" label="Applicant" />
                        <Radio className="py-4 px-6 max-smsm:py-2 max-smsm:px-4 border has-[:checked]:bg-[var(--color-electric-violet-500)]/5 hover:bg-[var(--color-mine-shaft-900)] border-[var(--color-mine-shaft-800)] rounded-lg has-[:checked]:border-[var(--color-electric-violet-500)]" autoContrast value="EMPLOYEE" label="Employer" />
                    </div>
          </Radio.Group>
                <Checkbox autoContrast label={<>I accept {''}<Anchor>Terms & Conditions</Anchor> </>} />
                <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled" color="darkorchid">Sign up</Button>
                <div className="mx-auto">
                    Have an account ? <NavLink to={"/login"} className="text-[var(--color-electric-violet-500)] hover:underline cursor-pointer max-xssm:text-sm" onClick={() => { setFormError(form); setData(form) }}>Login</NavLink>
                </div>
            </div>
        </>
    )
}
