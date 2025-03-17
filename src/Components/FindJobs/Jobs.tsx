import { useEffect, useState } from "react" // Importing React hooks for managing component state and side effects
import { JobCart } from "./JobCard" // Importing JobCart component for displaying individual job listings
import { Sort } from "./Sort" // Importing Sort component for sorting job listings
import { getAllJobs } from "../../Services/JobService" // Importing service function to fetch job data
import { useSelector, useDispatch } from "react-redux" // Importing Redux hooks for state management
import { resetFilter } from "../../Slices/FilterSlice" // Importing action to reset filters in the Redux store
import { resetSort } from "../../Slices/SortSlice"

/**
 * Jobs Component
 * 
 * This component displays a list of job listings with sorting functionality.
 * It fetches job data on mount and displays them in a responsive grid layout.
 *
 * @component
 * 
 * Features:
 * - Fetches job listings data on component mount
 * - Displays "Recommended Jobs" heading
 * - Includes Sort component for filtering options
 * - Shows job listings in a responsive flex grid
 * - Handles API errors gracefully
 *
 * State Management:
 * - Uses useState to maintain jobList state
 * - Initial state is array with empty object
 * - Updates state with API response data
 *
 * Layout:
 * - Outer padding of 28px (p-7)
 * - Flex container with space-between for header
 * - Job grid with 40px gap between cards (gap-10)
 * - 40px top margin and 20px horizontal margins (mt-10 mx-5)
 * 
 * Dependencies:
 * - JobCart component for individual job displays
 * - Sort component for filtering functionality
 * - getAllJobs service for API calls
 *
 * Error Handling:
 * - Catches and logs API errors
 * - Maintains existing job list on error
 *
 * @returns {JSX.Element} A container with job listings header and grid
 */
export const Jobs = () => {
    const dispatch = useDispatch() // Getting the dispatch function from Redux
    const [jobList, setJobList] = useState([{}]) // State to hold the list of jobs, initialized with an empty object
    const filter = useSelector((state: any) => state.filter) // Selecting the filter state from Redux store
    const sort = useSelector((state: any) => state.sort) // Selecting the sort state from Redux store
    const [filteredJobs, setFilteredJobs] = useState<any>([]) // State to hold the filtered job listings

    useEffect(() => {
        dispatch(resetFilter()) // Resetting filters when the component mounts
        dispatch(resetSort()) // Resetting sort when the component mounts
        getAllJobs().then((res) => { // Fetching job data from the API
            setJobList(res.filter((job: any) => job.jobStatus === "ACTIVE")) // Updating jobList with active jobs only
        }).catch((err) => { // Handling any errors during the fetch
            console.log(err); // Logging the error to the console
        })
    }, []) // Empty dependency array means this effect runs once on mount

    useEffect(() => {   
        if (sort=="Most Recent") {
            setJobList([...jobList].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()))
        }
        if (sort=="Salary(Low to High)") {
            setJobList([...jobList].sort((a: any, b: any) => a.packageOffered - b.packageOffered))
        }
        if (sort=="Salary(High to Low)") {
            setJobList([...jobList].sort((a: any, b: any) => b.packageOffered - a.packageOffered))
        }
    }, [sort])

    useEffect(() => {
        let filteredJobs = jobList // Starting with the full job list
        if (filter["Job Title"] && filter["Job Title"].length > 0) { // Checking if there are job title filters
            filteredJobs = filteredJobs.filter((job: any) => filter["Job Title"].some((jobTitle: any) => job.jobTitle?.toLowerCase().includes(jobTitle.toLowerCase()))) // Filtering jobs by title
        }
        if (filter["Location"] && filter["Location"].length > 0) { // Checking if there are location filters
            filteredJobs = filteredJobs.filter((job: any) => filter["Location"].some((location: any) => job.location?.toLowerCase().includes(location.toLowerCase()))) // Filtering jobs by location
        }
        if (filter["Experience"] && filter["Experience"].length > 0) { // Checking if there are experience filters
            filteredJobs = filteredJobs.filter((job: any) => 
                filter["Experience"].some((exp: string) => job.expirience.toLowerCase().includes(exp.toLowerCase())) // Filtering jobs by experience
            )
        }
        if (filter["Job Type"] && filter["Job Type"].length > 0) { // Checking if there are job type filters
            filteredJobs = filteredJobs.filter((job: any) => filter["Job Type"].some((jobType: any) => job.jobType?.toLowerCase().includes(jobType.toLowerCase()))) // Filtering jobs by job type
        }
        if (filter.exp && filter.exp.length > 0) { // Checking if there are experience range filters
            filteredJobs = filteredJobs.filter((job: any) => filter.exp[0] <= job.expirience && filter.exp[1] >= job.expirience) // Filtering jobs by experience range
        }
        if (filter.salary && filter.salary.length === 2) { // Checking if there are salary range filters and ensuring it has two values
            filteredJobs = filteredJobs.filter((job: any) => filter.salary[0] <= job.packageOffered && job.packageOffered <= filter.salary[1]); // Filtering jobs by salary range
        }
        setFilteredJobs(filteredJobs) // Updating the state with the filtered job list
    }, [filter, jobList]) // This effect runs when filter or jobList changes

    return <div className="p-4"> {/* Main container with padding */}
        <div className="flex justify-between items-center flex-wrap"> {/* Flex container for header */}
            <div className="text-2xl font-semibold max-xssm:text-xl ">Recommended Jobs</div> {/* Heading for the job listings */}
            <Sort sort="job" /> {/* Including the Sort component for sorting options */}
        </div>
        <div className="mt-10 mx-3 flex flex-wrap gap-5 w-full"> {/* Container for job listings with margin and gap */}
            {
                filteredJobs.length ? filteredJobs.map((job: any, index: any) => <JobCart key={index} {...job} />) : <div className="text-center text-2xl font-semibold">No Jobs Found</div> // Mapping through filtered jobs or displaying a message if none found
            }
        </div>
    </div>
}