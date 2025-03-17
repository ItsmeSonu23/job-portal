import { ActionIcon, Textarea } from "@mantine/core"
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { successNotification } from "../../Services/NotificationService"
import { changeProfile } from "../../Slices/ProfileSlice"
import { useMediaQuery } from "@mantine/hooks"
/**
 * About Component
 * 
 * A component that displays and allows editing of a user's "About" section in their profile.
 * Features inline editing with save/cancel functionality and Redux state management.
 * 
 * @component
 * 
 * Features:
 * - Toggle between view and edit modes
 * - Auto-expanding textarea for editing
 * - Save and cancel actions
 * - Redux integration for profile updates
 * - Success notifications on save
 * 
 * Visual Elements:
 * - "About" heading with edit controls
 * - Textarea in edit mode
 * - Text display in view mode
 * - Action icons for edit/save/cancel
 * 
 * Layout:
 * - Horizontal padding (px-3)
 * - Flex layout for header with controls
 * - Bottom margin for heading (mb-3)
 * - Justified text alignment for content
 * 
 * State Management:
 * - Local edit mode state
 * - Local about text state
 * - Redux profile state
 * 
 * Actions:
 * - Toggle edit mode
 * - Save changes to Redux store
 * - Cancel and revert changes
 * 
 * Props: None
 * 
 * @returns {JSX.Element} An editable about section
 */
export const About = () => {
    const matches = useMediaQuery(`(min-width: 475px)`)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [about, setAbout] = useState("")
    const profile = useSelector((state: any) => state.profile)

    /**
     * Handles toggling edit mode and initializes edit state
     */
    const handleEdit = () => {
        if (!edit) {
            setEdit(true)
            setAbout(profile.about)
        } else {
            setEdit(false)
        }
    }

    /**
     * Saves the edited about text to Redux store and shows success notification
     */
    const handleSave = () => {
        setEdit(false)
        let updatedProfile = { ...profile, about: about }
        dispatch(changeProfile(updatedProfile))
        successNotification("About updated successfully", "Your profile about has been updated")
    }

    return (
        <div className="px-3">
            <div className="text-2xl font-semibold mb-3 flex justify-between">
                About
                <div>
                    {edit && 
                        <ActionIcon onClick={() => handleSave()} variant="subtle" color="green.8" size={matches ? "lg" : "md"}>
                            <IconCheck className="h-4/5 w-4/5" />
                        </ActionIcon>
                    }
                    <ActionIcon onClick={() => handleEdit()} variant="subtle" color={edit ? "red.8" : "darkorchid"} size={matches ? "lg" : "md"}>
                        {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                </div>
            </div>
            {edit ? (
                <Textarea 
                    autosize 
                    minRows={3} 
                    placeholder="Enter about yourself" 
                    value={about} 
                    onChange={(event) => setAbout(event.currentTarget.value)} 
                />
            ) : (
                <div className="text-sm text-[var(--color-mine-shaft-400)] text-justify">
                    {profile?.about}
                </div>
            )}
        </div>
    )
}