import { Divider} from "@mantine/core"
import { ApplicationForm } from "./ApplicationForm";
import { timeAgo } from "../../Services/Utilities";

/**
 * ApplyJobCom Component
 * 
 * This component displays job application details and the application form.
 * It shows company information, job title, posting time, and number of applicants
 * before rendering the main application form.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.company - Name of the company
 * @param {string} props.jobTitle - Title of the job position
 * @param {string} props.postTime - Timestamp when the job was posted
 * @param {Array} props.applicants - Array of current applicants for the position
 * 
 * Features:
 * - Displays company logo from /Icons directory
 * - Shows job title prominently
 * - Indicates how long ago the job was posted using timeAgo utility
 * - Shows number of current applicants
 * - Includes full application form via ApplicationForm component
 * - Responsive layout with centered content
 */
export const ApplyJobCom = (props:any) => {
    
    return (
        <div className="w-2/3 max-bssm:w-4/5 max-smsm:w-full mx-auto">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-[var(--color-mine-shaft-800)] rounded-xl">
                        {/* Company logo displayed in dark background */}
                        <img className="h-14" src={`/Icons/${props.company}.png`} alt={`${props.company} logo`} />
                    </div>
                    <div className="">
                        {/* Job title displayed prominently */}
                        <div className="font-semibold text-2xl">{props.jobTitle}</div>
                        {/* Company name, posting time, and applicant count */}
                        <div className="text-lg flex text-[(--color-mine-shaft-300)] flex-wrap max-xsmm:text-sm"><span>&bull; {props.company}</span><span>&bull; {timeAgo(props.postTime)}</span> <span>&#x2022; {props.applicant ? props.applicant.length : 0} Applicants</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Divider between job details and application form */}
            <Divider my="xl" />
            {/* Main application form component */}
            <ApplicationForm/>
        </div>
    )
}