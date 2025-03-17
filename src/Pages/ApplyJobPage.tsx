/**
 * Apply Job Page Component
 * 
 * Renders the job application page which displays job details and application form.
 * Fetches job data based on URL parameter and provides navigation controls.
 * 
 * Features:
 * - Fetches and displays specific job details
 * - Back button for navigation
 * - Scrolls to top on load
 * - Error handling for failed job fetches
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/apply/:id" element={<ApplyJobPage />} />
 */

import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { useNavigate, useParams } from "react-router-dom"
import { ApplyJobCom } from "../Components/ApplyJob/ApplyJobCom"
import { useState, useEffect } from "react"
import { getJob } from "../Services/JobService"

export const ApplyJobPage = () => {
        // Navigation hook for routing
        const navigate = useNavigate()
        
        // Get job ID from URL parameters
        const { id } = useParams()
        
        // State to store fetched job details
        const [job, setJob] = useState<any>(null)

        // Fetch job data and scroll to top on component mount or ID change
        useEffect(() => {
                // Scroll to top of page
                window.scrollTo(0, 0)

                // Fetch job details from API
                getJob(id).then((res) => {
                        setJob(res)
                }).catch((err) => {
                        console.log(err);
                })
        }, [id])

        return <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins'] px-10 py-4">
                {/* Back navigation button */}
                <Button 
                    my={"md"}
                    onClick={() => navigate(-1)} 
                    leftSection={<IconArrowLeft size={20} />} 
                    color="darkorchid" 
                    variant="light"
                >
                    Back
                </Button>

                {/* Job application form component */}
                <ApplyJobCom {...job} />
        </div>
}