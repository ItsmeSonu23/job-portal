import { ActionIcon, TagsInput } from "@mantine/core"
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { successNotification } from "../../Services/NotificationService"
import { changeProfile } from "../../Slices/ProfileSlice"
import { useMediaQuery } from "@mantine/hooks"
/**
 * Skills Component
 * 
 * A component that displays and allows editing of a user's professional skills.
 * 
 * @component
 * 
 * Features:
 * - Display skills as tags/badges
 * - Toggle between view and edit modes
 * - Add/remove skills through TagsInput
 * - Redux integration for state management
 * - Success notifications on updates
 * 
 * Visual Elements:
 * - "Skills" section header
 * - Edit/Save/Cancel action buttons
 * - Tags input field in edit mode
 * - Skill badges in display mode
 * 
 * Layout:
 * - Padded container
 * - Flex header with justified content
 * - Wrapped flex container for skill badges
 * - Full-width tags input
 * 
 * Props: None
 * 
 * State:
 * @property {boolean} edit - Controls display/edit mode toggle
 * @property {string[]} skills - Array of user's skills
 * 
 * Redux:
 * @property {Object} profile - Profile data from Redux store
 * 
 * Actions:
 * - Toggle edit mode
 * - Save skills changes
 * - Cancel edits
 * 
 * Styling:
 * - Purple background for skill badges
 * - Rounded corners for badges
 * - Consistent spacing and padding
 * - Color-coded action buttons
 * 
 * @returns {JSX.Element} A skills display/edit interface
 */
export const Skills = () => {
    const matches = useMediaQuery(`(min-width: 475px)`)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const[skills,setSkills] = useState<string[]>([])
    const profile = useSelector((state: any) => state.profile)

    /**
     * Toggles edit mode and resets skills to current profile values on cancel
     */
    const handleEdit = () => {
        if (!edit) {
            setEdit(true)
        } else {
            setEdit(false)
            setSkills(profile.skills)
        }
    }

    /**
     * Saves skills changes to Redux store and shows success notification
     */
    const handleSave = () => {
        setEdit(false)
        let updatedProfile = { ...profile, skills:skills }
        dispatch(changeProfile(updatedProfile))
        successNotification("Skills updated successfully", "Your skills has been updated")
    }

    return (
        <div className="px-3">
            <div className="text-2xl font-semibold mb-3 flex justify-between">Skills <div>{edit && <ActionIcon onClick={() => handleSave()} variant="subtle" color="green.8" size={matches ? "lg" : "md"}>
                <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>}
                <ActionIcon onClick={() => handleEdit()} variant="subtle" color={edit ? "red.8" : "darkorchid"} size={matches ? "lg" : "md"}>
                    {
                        edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                    }
                </ActionIcon>
            </div></div>
            {
                edit ? <><TagsInput value={skills} onChange={setSkills} placeholder="Add Skills" splitChars={[",", " ", "|"]} /></> : <>
                    <div className="flex flex-wrap gap-2 ">
                        {
                            profile?.skills?.map((skill: any, index: number) => <div key={index} className="bg-[var(--color-electric-violet-500)] rounded-3xl text-[var(--color-mine-shaft-200)] text-xs font-medium px-3 py-1">{skill}</div>)
                        }
                    </div>
                </>
            }
        </div>
    )
}