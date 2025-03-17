import { NavLink } from "react-router-dom"

/**
 * NavLinks Component
 * 
 * This component renders the main navigation links in the header of the application.
 * It uses React Router's NavLink component to handle navigation and styling of active links.
 * 
 * Each link has the following features:
 * - Changes appearance when active (purple color and top border)
 * - Maintains consistent height and spacing
 * - Uses Tailwind CSS for styling
 * 
 * @returns {JSX.Element} A div containing navigation links
 */
export const NavLinks = () => {
    return (
        <div className="max-bssm:hidden flex gap-4 text-xl h-full items-center">
            {/* Link to job search page */}
            <NavLink to={"/find-jobs"} className={({isActive})=> isActive ? "flex border-t-[3px] text-[var(--color-electric-violet-300)] items-center h-full":""}>
                Find Jobs
            </NavLink>
            {/* Link to talent search page */}
            <NavLink to={"/find-talent"} className={({isActive})=> isActive ? "flex border-t-[3px] text-[var(--color-electric-violet-300)] items-center h-full":""}>
                Find Talent
            </NavLink>
            {/* Link to job posting page */}
            <NavLink to={"/post-job/0"} className={({isActive})=> isActive ? "flex border-t-[3px] text-[var(--color-electric-violet-300)] items-center h-full":""}>
                Post Job
            </NavLink>
            {/* Link to view posted jobs */}
            <NavLink to={`/posted-job/0`} className={({isActive})=> isActive ? "flex border-t-[3px] text-[var(--color-electric-violet-300)] items-center h-full":""}>
                Posted Jobs
            </NavLink>
            {/* Link to job history page */}
            <NavLink to={"/job-history"} className={({isActive})=> isActive ? "flex border-t-[3px] text-[var(--color-electric-violet-300)] items-center h-full":""}>
                Job History
            </NavLink>
        </div>
    )
}