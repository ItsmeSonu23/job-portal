import { IconBookmark, IconBookmarkFilled, IconClock } from "@tabler/icons-react"
import { Button, Divider, Text } from "@mantine/core"
import { NavLink } from "react-router-dom"
import { timeAgo } from "../../Services/Utilities"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../Slices/ProfileSlice"

/**
 * JobCart Component
 * 
 * A card component that displays job listing details with interactive save functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the job
 * @param {string} props.company - Company name
 * @param {string} props.jobTitle - Title of the job position
 * @param {Array} props.applicants - Array of job applicants
 * @param {string} props.expirience - Required experience level
 * @param {string} props.jobType - Type of job (e.g. Full-time, Part-time)
 * @param {string} props.location - Job location
 * @param {string} props.about - Job description
 * @param {number} props.packageOffered - Salary package in LPA
 * @param {string} props.postTime - Timestamp when job was posted
 * 
 * Features:
 * - Displays company logo, job title and applicant count
 * - Save/bookmark functionality integrated with Redux store
 * - Shows job details like experience, type and location as tags
 * - Truncated job description with 3 line limit
 * - Salary package and post time information
 * - Link to detailed job view
 * 
 * Styling:
 * - Dark theme using Mine Shaft color palette
 * - Hover effect with purple glow
 * - Consistent spacing and typography
 * - Responsive layout with flex containers
 * 
 * @returns {JSX.Element} A job listing card with interactive elements
 */
export const JobCart = (props: any) => {
    const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.profile)

    /**
     * Handles saving/unsaving a job to the user's profile
     * Updates the Redux store with modified savedJobs array
     */
    const handleSaveJob = () => {
        // Default to an empty array if savedJobs is undefined or null
        let savedJobs: any = Array.isArray(profile.savedJobs) ? [...profile.savedJobs] : [];
        console.log(savedJobs);

        if (savedJobs?.includes(props.id)) {
            savedJobs = savedJobs?.filter((id: any) => id !== props.id);
        } else {
            savedJobs = [...savedJobs, props.id];
        }

        let updatedProfile = { ...profile, savedJobs: savedJobs };
        dispatch(changeProfile(updatedProfile));
    }
    
    return (
        <div className="bg-[var(--color-mine-shaft-900)] p-5 w-72 justify-between flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_darkorchid] !shadow-mine-shaft-600 max-lgsm:w-[45%] max-mdsm:w-[45%] max-bssm:w-[45%] max-smsm:w-full">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-[var(--color-mine-shaft-800)] rounded-md">
                        <img className="h-7" src={`/Icons/${props.company}.png`} alt={props.company} />
                    </div>
                    <div className="">
                        <div className="font-semibold">{props.jobTitle}</div>
                        <div className="text-xs text-[(--color-mine-shaft-300)]"><NavLink to={"/company"} className="hover:text[var(--color-mine-shaft-200)]">{props.company}</NavLink> &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
                    </div>
                </div>
                {
                    profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-[var(--color-electric-violet-500)]" /> :
                        <IconBookmark onClick={handleSaveJob} className="text-[(--color-mine-shaft-300)] cursor-pointer hover:text-[var(--color-electric-violet-500)]" />
                }
            </div>
            <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-[var(--color-mine-shaft-800)] [&>div]:text-[var(--color-electric-violet-500)] [&>div]:rounded-lg text-xs flex-wrap">
                <div className="">{props.expirience}</div>
                <div className="">{props.jobType}</div>
                <div className="">{props.location}</div>
            </div>

            <Text className="!text-xs text-justify !text-[(--color-mine-shaft-300)]" lineClamp={3}>
                {props.about}
            </Text>
            <Divider size="xs" color="darkorchid" />
            <div className="flex justify-between">
                <div className="font-semibold text-[(--color-mine-shaft-200)]">
                    &#8377;{props.packageOffered} LPA
                </div>
                <div className="flex gap-1 text-xs text-[(--color-mine-shaft-400)] items-center">
                    <IconClock className="h-5 w-5" stroke={1.5} />Posted {timeAgo(props.postTime)}
                </div>
            </div>
            <NavLink to={`/jobs/${props.id}`}>
                <Button fullWidth color="darkorchid" variant="outline">View Job</Button>
            </NavLink>
        </div>
    )
}