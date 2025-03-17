/**
 * Home Page Component
 * 
 * Renders the main landing page of the application with multiple sections showcasing
 * key features and content. Provides a consistent layout and styling.
 * 
 * Features:
 * - Dream job search and matching section
 * - Featured companies showcase
 * - Job categories overview
 * - How it works explanation
 * - User testimonials
 * - Newsletter subscription
 * 
 * Layout Structure:
 * - DreamJob: Hero section with job search
 * - Companies: Featured companies carousel
 * - JobCategory: Browse jobs by category
 * - Working: Process explanation section
 * - Testimonials: User reviews and feedback
 * - Subscribe: Newsletter signup form
 * 
 * Styling:
 * - Dark background using Mine Shaft color
 * - Karla font family
 * - Minimum full viewport height
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/" element={<HomePage />} />
 */

import { Companies } from "../Components/LandingPage/Companies"
import { DreamJob } from "../Components/LandingPage/DreamJob"
import { JobCategory } from "../Components/LandingPage/JobCategory"
import { Subscribe } from "../Components/LandingPage/Subscribe"
import { Testimonials } from "../Components/LandingPage/Testimonials"
import { Working } from "../Components/LandingPage/Working"

export const HomePage = () => {
    return (
        <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font-['Karla']">
            <DreamJob />
            <Companies />
            <JobCategory />
            <Working />
            <Testimonials />
            <Subscribe />
        </div>
    )
}