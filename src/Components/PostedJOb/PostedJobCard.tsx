import { NavLink, useParams } from "react-router-dom"
import { timeAgo } from "../../Services/Utilities"

/**
 * PostedJobCard Component
 * 
 * A card component that displays individual job posting details and handles navigation.
 * Changes appearance when selected based on URL parameters.
 * 
 * @component
 * 
 * Features:
 * - Navigation link to job details
 * - Visual indication of selected state
 * - Compact display of key job information
 * - Relative time display for post date
 * 
 * Visual Elements:
 * - Job title in semibold font
 * - Location with medium font weight
 * - Relative timestamp (e.g. "2 hours ago")
 * - Left border accent in Electric Violet
 * - Background color changes when selected
 * 
 * Layout:
 * - Rounded corners (rounded-xl)
 * - Consistent padding (p-2)
 * - Left border accent (border-l-2)
 * - Stacked text elements
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accents for emphasis
 * - Selected state uses Electric Violet background
 * - Unselected uses dark background with gray text
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique identifier for the job
 * @param {string} props.jobTitle - Title of the job posting
 * @param {string} props.location - Location of the job
 * @param {string|Date} props.postTime - Timestamp when job was posted
 * 
 * State:
 * - Uses URL parameters to determine selected state
 * 
 * @returns {JSX.Element} A navigable card displaying job information
 */
export const PostedJobCard = (props: any) => {
    const { id } = useParams()
    return <NavLink to={`/posted-job/${props.id}`} className={`rounded-xl p-2 border-l-2 border-l-[var(--color-electric-violet-500)] ${props.id==id ? 'bg-[var(--color-electric-violet-500)] text-black' : 'bg-[var(--color-mine-shaft-900)] text-[var(--color-mine-shaft-300)]'}`}>
        <div className="text-sm font-semibold">{props.jobTitle}</div>
        <div className="text-xs font-medium">{props.location}</div>
        <div className="text-xs">{props.jobStatus==="DRAFT"?"Drafted":props.jobStatus==="CLOSED"?"Closed":"Posted"}{timeAgo(props.postTime)}</div>
    </NavLink>
}