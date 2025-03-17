/**
 * Find Jobs Page Component
 * 
 * Renders the main job search page with search functionality and job listings.
 * Provides a consistent layout with search bar, visual divider, and jobs list.
 * 
 * Features:
 * - Search bar for filtering jobs
 * - Visual divider for section separation
 * - Job listings display
 * - Full viewport height minimum
 * - Dark theme styling
 * 
 * Layout Structure:
 * - Search bar at top
 * - Divider for visual separation
 * - Jobs listing section
 * 
 * Styling:
 * - Dark background using Mine Shaft color
 * - Poppins font family
 * - Minimum full viewport height
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/find-jobs" element={<FindJobs />} />
 */

import { Divider } from "@mantine/core"
import { Jobs } from "../Components/FindJobs/Jobs"
import { SearchBar } from "../Components/FindJobs/SearchBar"

export const FindJobs = () => {
    return (
        <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins']">
            <SearchBar />
            <Divider size="sm" mx="md" />
            <Jobs />
        </div>
    )
}