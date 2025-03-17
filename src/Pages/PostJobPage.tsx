/**
 * Post Job Page Component
 * 
 * Renders the job posting creation page with a form for employers to create new job listings.
 * Provides a consistent layout and styling for the job posting interface.
 * 
 * Features:
 * - Job posting form interface
 * - Full viewport height minimum
 * - Dark theme styling
 * - Consistent padding and spacing
 * 
 * Layout Structure:
 * - Main container with full viewport height
 * - PostJob component for job creation form
 * 
 * Styling:
 * - Dark background using Mine Shaft color
 * - Poppins font family
 * - Horizontal padding of 2.5rem (px-10)
 * - Vertical padding of 1rem (py-4)
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/post-job" element={<PostJobPage />} />
 */

import { PostJob } from "../Components/PostJob/PostJob"


export const PostJobPage = () => {
    return <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins'] px-10 py-4">
        <PostJob/>
    </div>
}