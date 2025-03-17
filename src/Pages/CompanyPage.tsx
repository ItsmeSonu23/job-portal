/**
 * Company Profile Page Component
 * 
 * Renders a company's profile page showing company details and similar companies.
 * Provides navigation back to job search and displays company information in a two-column layout.
 * 
 * Features:
 * - Back navigation button to return to job search
 * - Main company profile information display
 * - Similar/related companies sidebar
 * - Consistent styling with dark theme
 * - Full viewport height minimum
 * 
 * Layout Structure:
 * - Back button navigation
 * - Divider for visual separation
 * - Two-column flex layout:
 *   - Left: Main company profile
 *   - Right: Similar companies suggestions
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/company/:name" element={<CompanyPage />} />
 */

import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { NavLink } from "react-router-dom"
import { Company } from "../Components/CompanyProfile/Company"
import { SimilarCompanies } from "../Components/CompanyProfile/SimilarCompanies"

export const CompanyPage = () => {
    return (
        <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins'] px-10 py-4">
            <NavLink className="my-4 inline-block " to={"/find-jobs"}>
                <Button leftSection={<IconArrowLeft size={20} />} color="darkorchid" variant="light">Back</Button>
            </NavLink>
            <Divider size="sm" />
            <div className="flex gap-10 justify-between">
               <Company/>
               <SimilarCompanies/>
            </div>
        </div>
    )
}