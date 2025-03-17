import { formatDate } from "../../Services/Utilities"

/**
 * ExpCard Component
 * 
 * Displays a single work experience entry with company details, duration and description.
 * 
 * @component
 * 
 * Features:
 * - Company logo display
 * - Job title and company name
 * - Location information
 * - Employment duration
 * - Role description
 * 
 * Visual Elements:
 * - Company logo in dark background
 * - Two-column layout with company info and dates
 * - Justified description text
 * - Consistent text sizing and colors
 * 
 * Layout:
 * - Flex container with vertical spacing
 * - Left section with logo and company details
 * - Right section with employment duration
 * - Full-width description below
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {string} props.company - Company name (also used for logo path)
 * @param {string} props.title - Job title/role
 * @param {string} props.location - Job location
 * @param {string} props.startDate - Employment start date
 * @param {string} props.endDate - Employment end date
 * @param {string} props.description - Role description/responsibilities
 * 
 * Styling:
 * - Dark background for logo container
 * - Rounded corners for logo container
 * - Muted text colors for secondary information
 * - Consistent spacing between elements
 * 
 * @returns {JSX.Element} A work experience card
 */
export const ExpCard = (props:any) => {
    return <div className="flex flex-col gap-2 ">
        <div className="flex justify-between flex-wrap gap-2">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-[var(--color-mine-shaft-800)] rounded-md">
                    <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold max-xssm:text-sm">{props.title}</div>
                    <div className="text-sm text-[(--color-mine-shaft-300)] max-xssm:text-xs">{props.company} &#x2022; {props.location}</div>
                </div>
            </div>
            <div className="text-sm text-[var(--color-mine-shaft-300)] max-xssm:text-xs">
                {formatDate(props.startDate)} - {formatDate(props.endDate)}
            </div>
        </div>
        <div className="text-sm  text-[var(--color-mine-shaft-300)] text-justify max-xssm:text-xs">
           {props.description}
        </div>
    </div>
}