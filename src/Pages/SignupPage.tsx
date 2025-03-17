/**
 * Signup/Login Page Component
 * 
 * Renders a combined signup and login page with sliding animation between views.
 * Features a centered logo, tagline, and navigation between authentication modes.
 * 
 * Features:
 * - Sliding animation between signup and login views
 * - Centered Clover logo and branding
 * - Home navigation button
 * - Full viewport height
 * - Overflow handling
 * - Dark theme styling
 * 
 * Layout Structure:
 * - Main container with full viewport height
 * - Home button in top left corner
 * - Sliding container with three sections:
 *   - Login component
 *   - Centered logo/branding
 *   - Signup component
 * 
 * Animation:
 * - Smooth sliding transition between views
 * - 1 second duration with ease-in-out
 * - Rounded corners animation on center panel
 * 
 * State Management:
 * - Uses location.pathname to determine view
 * - Controls sliding animation based on path
 * 
 * Navigation:
 * - Home button returns to landing page
 * - URL-based view switching (/login vs /signup)
 * 
 * Styling:
 * - Dark background using Mine Shaft colors
 * - Electric violet accent for logo
 * - Poppins font family
 * - Responsive text sizing
 * - Consistent spacing and alignment
 * 
 * Components:
 * @component Login - Handles user login form
 * @component Signup - Handles user registration form
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/signup" element={<SignupPage />} />
 * <Route path="/login" element={<SignupPage />} />
 */

import { TbCloverFilled } from "react-icons/tb"
import { Signup } from "../Components/SignupLogin/Signup"
import { Login } from "../Components/SignupLogin/Login"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"

export const SignupPage = () => {
    const location = useLocation()
    const navigation = useNavigate()
    return <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins'] overflow-hidden max-smsm:overflow-y-auto relative">
        <Button size="sm" className="!absolute left-5 z-10 top-5" onClick={()=>navigation("/")} leftSection={<IconArrowLeft size={20} />} color="darkorchid" variant="light">Home</Button>
        <div className={`w-[100%] h-[100vh] transition-all duration-1000 ease-in-out flex [&>*]:flex-shrink-0 ${location.pathname == "/signup" ? "-translate-x-1/2 max-smsm:-translate-x-full " : "translate-x-0"}`}>
            <Login />
            <div className={`w-1/2 h-full max-smsm:hidden max-smsm:min-h-full  transition-all duration-1000 ease-in-out ${location.pathname == "/signup" ? "rounded-r-[200px]" : "rounded-l-[200px]"}  bg-[var(--color-mine-shaft-900)] flex flex-col justify-center items-center`}>
                <div className="flex gap-3 items-center text-[var(--color-electric-violet-500)] p-3">
                    <TbCloverFilled className="text-8xl" />
                    <div className="text-8xl max-bssm:text-6xl max-mdsm:text-5xl max-smsm:text-4xl font-semibold">
                        Clover
                    </div>
                </div>
                <div className="text-2xl max-bssm:text-xl max-mdsm:text-lg max-smsm:text-base text-[var(--color-mine-shaft-200)] font-semibold">Find the jobs made for you!</div>
            </div>
            <Signup />
        </div>
    </div>
}