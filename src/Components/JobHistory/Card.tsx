import { Button, Divider, Text } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClock } from "@tabler/icons-react"
import { NavLink } from "react-router-dom"
import { timeAgo } from "../../Services/Utilities"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../Slices/ProfileSlice"

/**
 * Card Component
 * 
 * A job card component that displays job details and allows interaction with saved jobs.
 * Used in job history views to show applied, interviewing, and offered jobs.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the job
 * @param {string} props.jobTitle - Title of the job position
 * @param {string} props.company - Name of the hiring company
 * @param {Array} props.applicants - List of applicants for this job
 * @param {string} props.expirience - Required experience level
 * @param {string} props.jobType - Type of job (Full-time, Part-time, etc)
 * @param {string} props.location - Job location
 * @param {string} props.about - Brief description of the job
 * @param {number} props.packageOffered - Salary package in LPA
 * @param {string} props.postTime - Timestamp when job was posted
 * @param {boolean} props.applied - Whether user has applied to this job
 * @param {boolean} props.interviewing - Whether user is interviewing for this job
 * @param {boolean} props.offered - Whether user has been offered this job
 * 
 * Features:
 * - Interactive save/unsave job functionality
 * - Company logo display
 * - Job details including title, company, applicant count
 * - Key job attributes (experience, type, location)
 * - Truncated job description
 * - Salary and posting time information
 * - Interview schedule display (when applicable)
 * - Offer acceptance/rejection options (when applicable)
 * - Link to detailed job view
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accents
 * - Hover effects with purple glow
 * - Consistent spacing and typography
 * - Responsive layout with flex containers
 * 
 * State Management:
 * - Uses Redux for profile state
 * - Handles job saving/unsaving with profile updates
 * 
 * @returns {JSX.Element} A job card component
 */
export const Card = (props: any) => {
    const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.profile)

    /**
     * Handles saving/unsaving a job to user's profile
     * Updates the savedJobs array in profile state
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
        <div className="bg-[var(--color-mine-shaft-900)] p-5 w-80 justify-between flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_darkorchid] !shadow-mine-shaft-600">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-[var(--color-mine-shaft-800)] rounded-md">
                        <img className="h-7" src={`/Icons/${props.company}.png`} alt={props.company} />
                    </div>
                    <div className="">
                        <div className="font-semibold">{props.jobTitle}</div>
                        <div className="text-xs text-[var(--color-mine-shaft-300)]">{props.company} &#x2022; {props.applicants ? props.applicants.length : 0} applicants</div>
                    </div>
                </div>
                {profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-[var(--color-electric-violet-500)]" /> :
                    <IconBookmark onClick={handleSaveJob} className="text-[(--color-mine-shaft-300)] cursor-pointer hover:text-[var(--color-electric-violet-500)]" />}
            </div>
            <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-[var(--color-mine-shaft-800)] [&>div]:text-[var(--color-electric-violet-500)] [&>div]:rounded-lg text-xs">
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
                    <IconClock className="h-5 w-5" stroke={1.5} />{props.applied || props.interviewing ? "Applied" : props.offered ? "Interviewed" : "Posted"} {timeAgo(props.postTime)}
                </div>
            </div>
            {
                (props.offered || props.interviewing) && <Divider color="darkorchid" size="xs" />
            }
            {
                props.offered && <div className="flex gap-2">
                    <Button color="darkorchid" variant="outline" fullWidth>Accept</Button>
                    <Button color="darkorchid" variant="light" fullWidth>Reject</Button>
                </div>
            }
            {
                props.interviewing && <div className="flex gap-1 text-sm items-center">
                    <IconCalendarMonth className="h-5 w-5 text-[var(--color-electric-violet-500)]" stroke={1.5} />Sun, 25 August &bull; <span className="text-[var(--color-mine-shaft-400)]">10:00 AM</span>
                </div>
            }
            <NavLink to={`/jobs/${props.id}`}>
                <Button fullWidth color="darkorchid" variant="outline">View Job</Button>
            </NavLink>
        </div>
    )
}