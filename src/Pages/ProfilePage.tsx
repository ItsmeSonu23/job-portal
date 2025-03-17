/**
 * Profile Page Component
 * 
 * Renders the user profile page displaying profile information sections.
 * Maps through profile data to render individual profile components.
 * 
 * Features:
 * - Profile information display
 * - Multiple profile sections via mapping
 * - Full viewport height minimum
 * - Dark theme styling
 * - Visual section divider
 * 
 * Layout Structure:
 * - Main container with full viewport height
 * - Horizontal divider at top
 * - Mapped profile components below
 * 
 * Data Management:
 * - Uses profileData array from Data.ts
 * - Maps each data item to Profile component
 * - Provides unique key for each mapped item
 * 
 * Styling:
 * - Dark background using Mine Shaft color
 * - Poppins font family
 * - Horizontal margin on divider (mx-md)
 * - Full viewport height minimum
 * 
 * Component Props:
 * - Spreads profile data object to Profile component
 * - Index used as key for mapped items
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/profile" element={<ProfilePage />} />
 */

import { Divider } from "@mantine/core"
import { profileData } from "../Data/Data"
import { Profile } from "../Components/ProfilePage/Profile"

export const ProfilePage = () => {
    return (
        <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins']">
            <Divider mx="md" />
            {
                profileData.map((data, index) => <Profile key={index} {...data} />)
            }
        </div>
    )
}