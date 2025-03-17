import { ActionIcon } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { formatDate } from "../../Services/Utilities"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../Slices/ProfileSlice"
import { successNotification } from "../../Services/NotificationService"

/**
 * Certification Component
 * 
 * A component that displays a single certification entry with delete functionality.
 * 
 * @component
 * 
 * Features:
 * - Displays certification details (title, issuer, dates, ID)
 * - Shows issuer logo/icon
 * - Delete functionality when in edit mode
 * - Redux integration for state management
 * 
 * Visual Elements:
 * - Issuer icon/logo in dark background
 * - Title in semibold font
 * - Issuer name in smaller text
 * - Issue date and certificate ID
 * - Delete button (in edit mode)
 * 
 * Layout:
 * - Flex container with space between
 * - Left side: Icon and certification details
 * - Right side: Dates, ID and delete button
 * - Responsive alignment and spacing
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {string} props.title - Certification title
 * @param {string} props.issuer - Certification issuer
 * @param {string} props.issueDate - Date certification was issued
 * @param {string} props.certificateId - Unique certificate identifier
 * @param {number} props.index - Index in certifications array
 * @param {boolean} props.edit - Whether edit mode is active
 * 
 * State Management:
 * - Uses Redux for profile state
 * - Dispatches profile updates on deletion
 * 
 * Actions:
 * - Delete certification from profile
 * - Show success notification after deletion
 * 
 * Styling:
 * - Uses Tailwind classes for layout
 * - Custom color variables for theming
 * - Responsive text sizes
 * - Subtle animations on interactions
 * 
 * @returns {JSX.Element} A certification entry display
 */
export const Certification = (props: any) => {
    const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.profile)

    /**
     * Handles deletion of the certification
     * Updates Redux store and shows success notification
     */
    const handleDelete = () => {
        let certi = [...profile.certifications]
        certi.splice(props.index, 1)
        let updatedProfile = { ...profile, certifications: certi }
        dispatch(changeProfile(updatedProfile))
        successNotification("Success", "Certificate deleted successfully")
    }

    return <div className="flex justify-between flex-wrap ">
        <div className="flex gap-2 items-center">
            <div className="shrink-0 p-2 bg-[var(--color-mine-shaft-800)] rounded-md">
                <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
            </div>
            <div className="flex flex-col">
                <div className="font-semibold max-xssm:text-sm">{props.title}</div>
                <div className="text-sm text-[(--color-mine-shaft-300)] max-xssm:text-xs">{props.issuer}</div>
            </div>
        </div>
        <div className="flex items-center gap-2 ">
            <div className="flex items-end flex-col max-xssm:flex-row max-xssm:gap-3">
                <div className="text-sm text-[(--color-mine-shaft-300)] max-xssm:text-xs">Issued : {formatDate(props.issueDate)}</div>
                <div className="text-sm text-[(--color-mine-shaft-300)] max-xssm:text-xs">ID : {props.certificateId}</div>
            </div>
            {props.edit && <ActionIcon variant="subtle" color="red.8">
                <IconTrash onClick={handleDelete} className="h-4/5 w-4/5" stroke={1.2} />
            </ActionIcon>}
        </div>
    </div>
}
