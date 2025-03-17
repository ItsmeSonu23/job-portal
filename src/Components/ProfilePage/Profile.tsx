import { Avatar, Divider, FileInput, Overlay } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux"
import { Info } from "./Info"
import { changeProfile } from "../../Slices/ProfileSlice"
import { About } from "./About"
import { Skills } from "./Skills"
import { Expirience } from "./Expirience"
import { Certificate } from "./Certificate"
import { useHover } from "@mantine/hooks"
import { IconEdit } from "@tabler/icons-react"
import { successNotification } from "../../Services/NotificationService"
import { getBase64 } from "../../Services/Utilities"

/**
 * Profile Component
 * 
 * Main profile page component that displays and manages a user's complete profile information.
 * 
 * @component
 * 
 * Features:
 * - Profile banner image
 * - Editable profile picture with hover effects
 * - Sections for different profile information
 * - Redux integration for profile state management
 * 
 * Visual Elements:
 * - Banner image at top
 * - Large circular profile picture overlapping banner
 * - Edit overlay on profile picture hover
 * - Multiple content sections with dividers
 * 
 * Layout:
 * - Centered container (80% width)
 * - Banner with overlapping profile picture
 * - Vertical stack of profile sections
 * - Consistent section spacing with dividers
 * 
 * Props:
 * @param {Object} props - Component properties (currently unused)
 * 
 * State Management:
 * - Redux for profile data
 * - Hover state for profile picture
 * - File input handling for picture updates
 * 
 * Child Components:
 * - Info: Basic profile information
 * - About: User biography/description
 * - Skills: User's skill set
 * - Experience: Work history
 * - Certificate: Professional certifications
 * 
 * Profile Picture Features:
 * - Hover overlay with edit icon
 * - File input for uploading new picture
 * - Base64 conversion for storage
 * - Success notification on update
 */
export const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.profile)

    const { hovered, ref } = useHover();

    /**
     * Handles profile picture file upload
     * Converts image to base64, updates Redux store, and shows success notification
     * 
     * @param {File} image - The uploaded image file
     */
    const handleFileChange = async(image:any)=>{
        let picture:any = await getBase64(image)
        console.log(picture); 
        let updatedProfile = {...profile,picture:picture.split(",")[1]}
        dispatch(changeProfile(updatedProfile))
        successNotification("Success","Profile picture updated successfully")
    }
   
    return (
        <div className="w-4/5 max-lgsm:w-full mx-auto">
            <div className="relative px-5">
                <img className="rounded-t-2xl max-xssm:h-36 max-xssm:w-full" src="/Profile/Banner.png" alt="" />
                <div ref={ref} className="absolute -bottom-1/3 max-mdsm:-bottom-20 max-smsm:-bottom-18 left-3 flex items-center justify-center">
                    <Avatar className="!h-48 !w-48 max-mdsm:w-40 max-mdsm:h-40 max-smsm:!h-36 max-smsm:!w-36 max-xssm:!h-32 max-xssm:!w-32 border-8 absolute -bottom-1/3 rounded-full left-6 border-[var(--color-mine-shaft-950)]" src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:"/avatar.png" } alt="profile pic" />

                    {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75}/>}
                    {hovered&& <IconEdit className="absolute z-[300] w-16 h-16" />}
                    {hovered && <FileInput onChange={handleFileChange} className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full" variant="transparent" accept="image/png,image/jpeg,image/jpg" />}
                </div>
            </div>

            <div className="px-5 mt-25">
                {/* info section of the profile page */}
                <Info />
                <Divider mx="xs" my="xl" />
                {/* About section of the profile page */}
                <About />
                <Divider mx="xs" my="xl" />

                {/* Skills section of the profile page */}
                <Skills />
                <Divider mx="xs" my="xl" />

                {/* Experience section of profile page */}
                <Expirience />
                <Divider mx="xs" my="xl" />
                {/* certifications section  */}
                <Certificate />
            </div >
        </div >
    )
}