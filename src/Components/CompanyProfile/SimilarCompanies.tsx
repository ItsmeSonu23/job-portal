import { similar } from "../../Data/Data"
import { CompanyCard } from "./CompanyCard"

/**
 * SimilarCompanies Component
 * 
 * This component displays a sidebar section showing similar/recommended companies.
 * It renders up to 4 company cards in a vertical layout.
 *
 * @component
 * 
 * Features:
 * - Takes up 25% of container width (w-1/4)
 * - Shows "Recommended Talent" heading
 * - Displays up to 4 CompanyCard components
 * - Vertical flex layout with consistent spacing
 *
 * Layout:
 * - Heading uses text-xl size and semibold weight
 * - 20px bottom margin below heading (mb-5) 
 * - Flex column container for cards
 * - 20px gap between cards (gap-5)
 *
 * Dependencies:
 * - similar data array from Data.ts
 * - CompanyCard component for individual company displays
 * 
 * @returns {JSX.Element} A sidebar section with recommended company cards
 */
export const SimilarCompanies = () => {
    return (
        <div className="w-1/4">
            <div className="text-xl font-semibold mb-5">Recommended Talent</div>
            <div className="flex flex-col flex-wrap gap-5">
                {similar.map((companies, index) => index < 4 && <CompanyCard key={index} {...companies} />)}
            </div>
        </div>
    )
}