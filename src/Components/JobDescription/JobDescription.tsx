import { ActionIcon, Button, Divider } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react"
import { NavLink } from "react-router-dom"
import { card } from "../../Data/Data"
import DOMPurify from 'dompurify'
import { timeAgo } from "../../Services/Utilities"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../Slices/ProfileSlice"
import { useEffect, useState } from "react"
import { postJob } from "../../Services/JobService"
import { errorNotification, successNotification } from "../../Services/NotificationService"
/**
 * JobDescription Component
 * 
 * A detailed job posting component that displays comprehensive information about a job listing.
 * 
 * @component
 * @param {Object} props - Component props containing job details
 * @param {string} props.id - Unique identifier for the job
 * @param {string} props.jobTitle - Title of the job position
 * @param {string} props.company - Name of the hiring company
 * @param {string} props.description - HTML description of the job (sanitized before rendering)
 * @param {Array} props.applicants - List of applicants for this job
 * @param {boolean} props.edit - Whether the job posting is in edit mode
 * @param {Array} props.skillsRequired - Required skills for the position
 * @param {string} props.postTime - Timestamp when job was posted
 * 
 * Features:
 * - Job header with company logo, title, and posting details
 * - Interactive buttons for applying, editing, and saving jobs
 * - Key job metrics display (salary, experience, location, etc)
 * - Required skills section with tag-style display
 * - Sanitized HTML rendering of job description
 * - Company profile section with additional details
 * 
 * State Management:
 * - Uses Redux for user and profile state
 * - Local state for application status
 * - Handles job saving/unsaving with profile updates
 * 
 * Layout:
 * - Two-thirds width container (w-2/3)
 * - Sections separated by dividers
 * - Responsive flex layouts for content organization
 * - Consistent spacing and typography
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accents
 * - Interactive hover states
 * - Custom styling for HTML content
 * 
 * Security:
 * - DOMPurify sanitization for HTML content
 * - Safe HTML rendering with dangerouslySetInnerHTML
 * 
 * Conditional Rendering:
 * - Different button states based on application status
 * - Edit mode variations
 * - Saved job status indication
 * 
 * @returns {JSX.Element} A comprehensive job description component
 */
export const JobDescription = (props: any) => {
    const dispatch = useDispatch()
    const [applied, setApplied] = useState(false)
    const user = useSelector((state: any) => state.user)
    const d = DOMPurify.sanitize(props.description)
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

    // Check if user has already applied when component mounts
    useEffect(() => {
        if (props.applicants?.filter((applicant: any) => applicant.applicantId == user.id).length > 0) {
            setApplied(true)
        }
    }, [props])

    const handleClose = () => {
        postJob({ ...props, jobStatus: "CLOSED" }).then(() => {
            successNotification("Job closed successfully", "Job closed successfully")
        }).catch((err: any) => {
            errorNotification("Error closing job", err.response.data.message)
        })
    }

    return <div className="w-2/3 max-bssm:w-full">
        <div className="w-full flex justify-between items-center flex-wrap gap-3">
            <div className="flex gap-2 items-center">
                <div className=" shrink-0 p-3 bg-[var(--color-mine-shaft-800)] rounded-xl">
                    <img className="h-14 max-xssm:h-10 max-xssm:w-10" src={`/Icons/${props.company}.png`} alt="" />
                </div>
                <div className="">
                    <div className="font-semibold text-2xl max-xssm:text-xl">{props.jobTitle}</div>
                    <div className="text-lg flex text-[(--color-mine-shaft-300)] flex-wrap max-xsmm:text-sm"><span>&bull; {props.company}</span><span>&bull; {timeAgo(props.postTime)}</span> <span>&#x2022; {props.applicant ? props.applicant.length : 0} Applicants</span></div>
                </div>
            </div>
            <div className="flex max-sm:w-full  sm:flex-col gap-2 items-center max-smsm:my-5 justify-start">
                {(props.edit || !applied) && <NavLink to={props.edit ? `/post-job/${props.id}` : `/apply-jobs/${props.id}`}>
                    <Button  color="darkorchid" size="sm" variant="light">{props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}</Button>
                </NavLink>}
                {
                    !props.edit && applied && <Button className="max-xssm:text-xs w-[50%]" color="green.8" size="sm" variant="light">Applied</Button>
                }
                {
                    props.edit && !props.closed ? <Button color="red.5" size="sm" variant="outline" onClick={handleClose}>Close</Button> : profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-[var(--color-electric-violet-500)]" /> :
                        <IconBookmark onClick={handleSaveJob} className="text-[(--color-mine-shaft-300)] cursor-pointer hover:text-[var(--color-electric-violet-500)]" />
                }
            </div>
        </div>
        <Divider my="xl" />
        <div className="flex justify-between  gap-3 max-smsm:flex-wrap">
            {
                card.map((card: any, index: number) => <div key={index} className="flex flex-col items-center gap-1 ">
                    <ActionIcon color="darkorchid" className="!h-12 !w-12 max-xssm:!h-8 max-xssm:!w-8" variant="filled" radius="xl" aria-label="Settings">
                        <card.icon className="h-4/5 w-4/5" stroke={1.5} />
                    </ActionIcon>
                    <div className="text-sm text-[(--color-mine-shaft-300)]">{card.name}</div>
                    <div className="font-semibold">{props ? props[card.id] : "NA"} {card.id == "packageOffered" && <>LPA</>}</div>
                </div>)
            }

        </div>
        <Divider my="xl" />
        <div className="">
            <div className="text-xl font-semibold mb-5">Required Skills</div>
            <div className="flex gap-2 flex-wrap">
                {
                    props?.skillsRequired?.map((skill: any, index: number) => <ActionIcon key={index} color="darkorchid" className="!h-fit !w-fit font-medium !text-sm max-xssm:!text-xs" p={"xs"} variant="filled" radius="xl" aria-label="Settings">
                        {skill}
                    </ActionIcon>)
                }

            </div>
        </div>
        <Divider my="xl" />
        <div className="[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-[(--color-mine-shaft-200)] [&_p]:text-justify [&_*]:text-[(--color-mine-shaft-300)] [&_li]:marker:text-[(--color-electric-violet-500)] [&_li]:mb-1 [&_p]:text-sm [&_li]:text-xs " dangerouslySetInnerHTML={{ __html: d }}>

        </div>
        <Divider my="xl" />
        <div className="">
            <div className="text-xl font-semibold mb-5">About Company</div>
            <div className="flex justify-between mb-5 max-xssm:flex-wrap max-xssm:gap-2">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-[var(--color-mine-shaft-800)] rounded-xl">
                        <img className="h-14" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div className="">
                        <div className="font-semibold text-2xl">{props.company}</div>
                        <div className="text-lg text-[(--color-mine-shaft-300)]">10K+ Employees</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <NavLink to={`/company/${props.company}`}>
                        <Button color="darkorchid" variant="light">Company Profile</Button>
                    </NavLink>

                </div>
            </div>
            <div className="text-[(--color-mine-shaft-300)] text-justify max-xssm:text-xs">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit praesentium nesciunt a ab similique labore eveniet commodi blanditiis, perspiciatis ex deleniti eligendi fugiat quam provident iste facere eos. Deserunt, quidem? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas provident itaque molestias ab cupiditate dolorum quae omnis unde et, neque quibusdam qui eius inventore at fugit voluptate tempore! Maxime, voluptas.
            </div>

        </div >
    </div>
}