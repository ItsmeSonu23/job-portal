/**
 * Talent Profile Page Component
 * 
 * Renders a talent profile page showing detailed profile information and recommended talents.
 * Provides navigation, profile sections, and talent recommendations in a dark theme layout.
 * 
 * Features:
 * - Back navigation to talent search
 * - Profile information display
 * - Recommended talents sidebar
 * - Full viewport height
 * - Dark theme styling
 * 
 * Layout Structure:
 * - Main container with full viewport height
 * - Back navigation button at top
 * - Horizontal divider below nav
 * - Two-column layout:
 *   - Left: Profile information sections
 *   - Right: Recommended talents
 * 
 * Navigation:
 * - Back button returns to talent search page
 * - Uses NavLink for routing
 * - Custom styled Mantine Button
 * 
 * Data Management:
 * - Maps profileData array to Profile components
 * - Provides unique key for each mapped item
 * - Spreads profile data as props
 * 
 * Styling:
 * - Dark background using Mine Shaft color
 * - Poppins font family
 * - Consistent padding and spacing
 * - Flex layout with gap spacing
 * - Custom button styling
 * 
 * Components:
 * @component Profile - Displays individual profile sections
 * @component RecommendedTalent - Shows recommended talent sidebar
 * 
 * @component
 * @example
 * // In router configuration
 * <Route path="/talent-profile" element={<TalentProfile />} />
 */

import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { RecommendedTalent } from "../Components/TalentProfile/RecommendedTalent"
import { Profile } from "../Components/TalentProfile/Profile"
import { useState } from "react"
import { useEffect } from "react"
import { getAllProfiles } from "../Services/ProfileService"

export const TalentProfile = () => {
    const navigate = useNavigate()
    const [talents, setTalents] = useState<any[]>([])
    useEffect(() => {
        getAllProfiles().then((res) => {
            setTalents(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])           
    return <div className="min-h-[100vh] bg-[var(--color-mine-shaft-950)] font=['poppins'] px-5 max-xssm:px-2 py-4">
        <Button my={"sm"} leftSection={<IconArrowLeft size={20} />} color="darkorchid" variant="light" onClick={() => navigate(-1)}>Back</Button>
        <div className="flex gap-5 max-lgsm:flex-wrap">
            <Profile />
            <RecommendedTalent talents={talents} />
        </div>
    </div>
}