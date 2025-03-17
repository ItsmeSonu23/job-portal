/**
 * Job History Page Component
 * 
 * Renders the user's job application history page showing past applications.
 * Provides a consistent layout with job history display in a dark theme.
 * 
 * Features:
 * - Job application history listing
 * - Full viewport height minimum
 * - Dark theme styling
 * - Consistent padding and spacing
 * 
 * Layout Structure:
 * - Main container with full viewport height
 * - Inner container with vertical margin
 * - Job history component display
 * 
 * Styling:
 * - Dark background using Mine Shaft color
 * - Poppins font family
 * - Horizontal padding of 2.5rem (px-10)
 * - Vertical padding of 1rem (py-4)
 * - Inner container margin of 1.25rem (my-5)
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/job-history" element={<JobHistoryPage />} />
 */

import { JobHistory } from "../Components/JobHistory/JobHistory"


export const JobHistoryPage = () => {
    return (
        <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins'] px-10 py-4">
            <div className=" my-5">
                <JobHistory/>
            </div>
        </div>
    )
}