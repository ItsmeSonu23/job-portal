import { Button, Divider, Drawer } from "@mantine/core"
import { PostedJob } from "../Components/PostedJOb/PostedJob"
import { PostedJobDesc } from "../Components/PostedJOb/PostedJobDesc"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getJobPostedBy } from "../Services/JobService"
import { useDisclosure } from "@mantine/hooks"
import { useMediaQuery } from "@mantine/hooks"
/**
 * Posted Job Page Component
 * 
 * Renders a page displaying jobs posted by the current user with both list and detailed views.
 * Provides job management functionality and real-time status updates.
 * 
 * Features:
 * - Job list sidebar showing all posted jobs
 * - Detailed job information display
 * - Active/Draft status indicators
 * - Automatic job selection on load
 * - Real-time job data updates
 * - Scroll position management
 * - Error handling for API calls
 * 
 * Layout Structure:
 * - Full viewport height container
 * - Dark theme styling
 * - Two-column layout:
 *   - Left: Job listings sidebar
 *   - Right: Selected job details
 * - Visual divider for section separation
 * 
 * State Management:
 * @property {Array} jobList - Array of jobs posted by current user
 *                            Updated via API calls
 * @property {Object} job - Currently selected job details
 *                         Updated when selection changes
 * 
 * URL Parameters:
 * @property {string} id - Job ID from URL parameters
 *                        Used to select and display specific job
 * 
 * Redux Integration:
 * - Accesses user data from Redux store
 * - Uses user ID for API authentication
 * 
 * Side Effects:
 * - Scrolls to top on job selection change
 * - Fetches job data on mount and ID changes
 * - Auto-navigates to first job if none selected
 * 
 * Error Handling:
 * - Graceful error logging for API failures
 * - Fallback empty states for missing data
 * 
 * Styling:
 * - Dark background using Mine Shaft color
 * - Poppins font family
 * - Consistent padding and spacing
 * - Responsive layout with gap spacing
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/posted-job/:id" element={<PostedJobPage />} />
 */
export const PostedJobPage = () => {
    const { id } = useParams()
    const matches = useMediaQuery(`(max-width: 769px)`)
    const [opened, { open, close }] = useDisclosure(false)
    const user = useSelector((state: any) => state.user)
    const [jobList, setJobList] = useState<any[]>([])
    const [job, setJob] = useState<any>({})
    const navigate = useNavigate()

    useEffect(() => {
        // Scroll to top when job selection changes
        window.scrollTo(0, 0)

        // Fetch jobs posted by current user
        getJobPostedBy(user?.id)
            .then((data) => {
                setJobList(data)
                if (data && data.length > 0 && (!id || Number(id) <= 0)) {
                    navigate(`/posted-job/${data[0].id}`)
                }
                // Find and set the selected job based on URL param
                const selectedJob = data.find((item: any) => item.id == id)
                setJob(selectedJob || {})

            })
            .catch((err) => {
                console.error("Error:", err.message)
            })


    }, [id, user?.id]) // Added user?.id as dependency

    return (
        <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins'] px-5 max-mdsm:px-5">
            <Divider size="sm" />
            {matches && <Button my={"xs"} size={matches ? "md" : "sm"} onClick={open}>All Jobs</Button>}
            <Drawer opened={opened} size="xs" overlayProps={{ opacity: 0.55, blur: 3 }} onClose={close} title="All Jobs">
                <PostedJob job={job} jobList={jobList} />
            </Drawer>
            <div className="flex gap-10 justify-around">
                {!matches && <PostedJob job={job} jobList={jobList} />}
                <PostedJobDesc {...job} />
            </div>
        </div>
    )
}