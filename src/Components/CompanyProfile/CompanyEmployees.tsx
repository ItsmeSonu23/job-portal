import { talents } from "../../Data/Data"
import { TalentCard } from "../FindTalent/TalentCard"

/**
 * CompanyEmployees Component
 * 
 * This component displays a grid of employee cards for a company profile page.
 * It shows up to 6 employees from the talents data array using the TalentCard component.
 *
 * @component
 * 
 * Features:
 * - Displays a responsive grid of employee cards
 * - Limits display to maximum 6 employees
 * - Uses consistent spacing and layout
 * - Reuses TalentCard component for each employee
 *
 * Layout:
 * - Flex container with wrapping for responsive grid
 * - 10px gap between cards (gap-10)
 * - Top margin of 10px (mt-10)
 * - Horizontal margin of 3px (mx-3)
 * 
 * @returns {JSX.Element} A flex container with mapped TalentCard components
 */
export const CompanyEmpoyees = () => {
    return (
        <div className="mt-10 mx-3 flex flex-wrap gap-10">
            {talents.map((talent, index) => 
                // Only render first 6 talents
                index < 6 && <TalentCard key={index} {...talent} />
            )}
        </div>
    )
}