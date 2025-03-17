import { ActionIcon } from "@mantine/core"
import { IconExternalLink } from "@tabler/icons-react"

/**
 * CompanyCard Component
 * 
 * This component displays a company card with basic company information and a link action.
 * It shows the company logo, name, employee count, and an external link button in a
 * consistent layout.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the company, used for both display and logo path
 * @param {number} props.employees - Number of employees at the company
 *
 * Features:
 * - Displays company logo from /Icons directory
 * - Shows company name and employee count
 * - Includes external link action button
 * - Responsive layout with dark theme styling
 * - Consistent spacing and alignment
 *
 * Styling:
 * - Uses dark background colors from Mine Shaft palette
 * - Rounded corners for card and logo container
 * - Subtle hover effect on external link button
 * - Compact but readable text sizing
 */
export const CompanyCard = (props: any) => {
    return (
        <div className="flex justify-between  bg-[var(--color-mine-shaft-900)] items-center rounded-lg p-2">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-[var(--color-mine-shaft-800)] rounded-md">
                    <img className="h-7" src={`/Icons/${props.name}.png`} alt={props.name} />
                </div>
                <div className="">
                    <div className="font-semibold">{props.name}</div>
                    <div className="text-xs text-[(--color-mine-shaft-300)]">{props.employees} Employees</div>
                </div>
            </div>
            <ActionIcon color="darkorchid" variant="subtle" >
                <IconExternalLink />
            </ActionIcon>
        </div>
    )
}