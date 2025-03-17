import { jobList } from "../../Data/Data"
import { JobCart } from "../FindJobs/JobCard"
import { Sort } from "../FindJobs/Sort"

/**
 * CompanyJobs Component
 * 
 * This component displays a list of recommended jobs for a company profile page.
 * It includes a header with sorting functionality and a responsive grid of job cards.
 *
 * @component
 * 
 * Features:
 * - Displays "Recommended Jobs" heading
 * - Includes Sort component for filtering options
 * - Shows job listings in a responsive flex grid
 * - Reuses JobCart component for each job listing
 * - Maps through jobList data to generate cards
 *
 * Layout:
 * - Outer padding of 28px (p-7)
 * - Flex container with space-between for header
 * - Job grid with 12px gap between cards (gap-3)
 * - 40px top margin below header (mt-10)
 * 
 * Dependencies:
 * - jobList from Data.ts for job listings
 * - JobCart component for individual job displays
 * - Sort component for filtering functionality
 *
 * @returns {JSX.Element} A container with job listings header and grid
 */
export const CompanyJobs = () => {
    return <div className="p-7">
        <div className="flex justify-between">
            <div className="text-2xl font-semibold">Recommended Jobs</div>
            <Sort />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
            {
                jobList.map((job, index) => <JobCart key={index} {...job} />)
            }
        </div>
    </div>
}