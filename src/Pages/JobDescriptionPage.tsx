/**
 * Job Description Page Component
 * 
 * Renders a detailed job posting page showing the job description and recommended jobs.
 * Provides navigation back to job search and displays job information in a two-column layout.
 * 
 * Features:
 * - Back navigation button to return to job search
 * - Main job description display
 * - Recommended jobs sidebar
 * - Automatic scroll to top on load
 * - Job data fetching and state management
 * - Error handling for failed job fetch
 * - Consistent styling with dark theme
 * - Full viewport height minimum
 * 
 * Layout Structure:
 * - Back button navigation
 * - Two-column flex layout:
 *   - Left: Main job description
 *   - Right: Recommended jobs suggestions
 * 
 * State Management:
 * - Fetches job data based on URL parameter
 * - Maintains job data in local state
 * - Handles loading and error states
 * 
 * Styling:
 * - Dark background using Mine Shaft color
 * - Poppins font family
 * - Consistent padding and spacing
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/jobs/:id" element={<JobDescriptionPage />} />
 */

import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { NavLink, useParams } from "react-router-dom"
import { JobDescription } from "../Components/JobDescription/JobDescription"
import { RecommendedJob } from "../Components/JobDescription/RecommendedJob"
import { useEffect, useState } from "react"
import { getJob } from "../Services/JobService"

export const JobDescriptionPage = () => {
  const { id } = useParams()
  const [job, setJob] = useState<any>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    getJob(id).then((res) => {
      setJob(res)
    }).catch((err) => {
      console.log(err);
    })
  }, [id])

  return <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins'] px-10 py-4">
    <NavLink className="my-4 inline-block " to={"/find-jobs"}>
      <Button leftSection={<IconArrowLeft size={20} />} color="darkorchid" variant="light">Back</Button>
    </NavLink>

    <div className="flex gap-10  justify-around max-bssm:flex-wrap">
      <JobDescription {...job} />
      <RecommendedJob />
    </div>
  </div>
}