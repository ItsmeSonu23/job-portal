import { useParams } from "react-router-dom"
import { JobCart } from "../FindJobs/JobCard"
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";

/**
 * RecommendedJob Component
 * 
 * A component that displays recommended job listings, excluding the currently viewed job.
 * 
 * @component
 * 
 * Features:
 * - Fetches all job listings on mount
 * - Filters out currently viewed job
 * - Displays up to 7 recommended jobs
 * - Responsive flex column layout
 * 
 * State Management:
 * - Uses useState to store job listings
 * - Fetches data via getAllJobs service
 * - Error handling for failed API calls
 * 
 * Props: None
 * 
 * URL Parameters:
 * - id: Current job ID from URL params (used for filtering)
 * 
 * Layout:
 * - Section title with large text and semibold weight
 * - Flex column container for job cards
 * - 20px gap between cards (gap-5)
 * 
 * Components:
 * - JobCart: Individual job listing card
 * 
 * Data Flow:
 * 1. Component mounts
 * 2. useEffect triggers API call
 * 3. Job data stored in state
 * 4. Filtered and mapped to JobCart components
 * 
 * Error Handling:
 * - Catches and logs API errors
 * - Initializes with empty object array
 * 
 * @returns {JSX.Element} A list of recommended job listings
 */
export const RecommendedJob = () => {
    const { id } = useParams();
    const [jobList, setJobList] = useState<any>([{}])
    
    useEffect(() => {
        getAllJobs()
            .then((res) => {
                setJobList(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return <div className="">
        <div className="text-xl font-semibold mb-5">Recommended Talent</div>
        <div className="flex bs:flex-col flex-wrap gap-5">
            {jobList?.map((talent: any, index: number) => 
                index < 7 && id != talent.id && <JobCart key={index} {...talent} />
            )}
        </div>
    </div>
}