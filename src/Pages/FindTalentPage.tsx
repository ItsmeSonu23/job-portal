/**
 * Find Talent Page Component
 * 
 * Renders the main talent search page with search functionality and talent listings.
 * Provides a consistent layout with search bar, visual divider, and talent profiles.
 * 
 * Features:
 * - Search bar for filtering talent profiles
 * - Visual divider for section separation  
 * - Talent listings display
 * - Full viewport height minimum
 * - Dark theme styling
 * 
 * Layout Structure:
 * - Search bar at top
 * - Divider for visual separation
 * - Talent profiles section
 * 
 * Styling:
 * - Dark background using Mine Shaft color
 * - Poppins font family
 * - Minimum full viewport height
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/find-talent" element={<FindTalentPage />} />
 */

import { Divider } from "@mantine/core"
import { SearchBar } from "../Components/FindTalent/SearchBar"
import { Talents } from "../Components/FindTalent/Talents"

export const FindTalentPage = () => {
    return <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins']">
        <SearchBar/>
        <Divider size="sm" mx="md" />
        <Talents/>
    </div>
}