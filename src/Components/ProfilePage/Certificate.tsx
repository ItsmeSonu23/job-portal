import { ActionIcon } from "@mantine/core"
import { IconPlus, IconPencil, IconX } from "@tabler/icons-react"
import { Certification } from "./Certification"
import { CertiInput } from "./CertiInput"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useMediaQuery } from "@mantine/hooks"
/**
 * Certificate Component
 * 
 * A component that manages and displays a user's professional certifications in their profile.
 * Allows adding new certifications and editing existing ones.
 * 
 * @component
 * 
 * Features:
 * - Display list of user certifications
 * - Add new certifications
 * - Toggle edit mode for existing certifications
 * - Redux integration for profile data
 * 
 * Visual Elements:
 * - "Certifications" heading with action buttons
 * - Add certification button (plus icon)
 * - Edit toggle button (pencil/X icon)
 * - List of certification entries
 * - Certification input form when adding
 * 
 * Layout:
 * - Horizontal padding (px-3)
 * - Flex layout with space between header items
 * - Vertical stack of certification entries
 * - 8px gap between certification entries
 * 
 * State Management:
 * - Local edit mode state
 * - Local add certification state
 * - Redux profile state for certification data
 * 
 * Props: None
 * 
 * State:
 * @property {boolean} edit - Controls edit mode for existing certifications
 * @property {boolean} addCerti - Controls visibility of add certification form
 * 
 * Redux:
 * @property {Object} profile - User profile data from Redux store
 * 
 * Child Components:
 * - Certification: Displays individual certification entries
 * - CertiInput: Form for adding new certifications
 * 
 * @returns {JSX.Element} A certification management interface
 */
export const Certificate = () => {
    const matches = useMediaQuery(`(min-width: 475px)`)
    const [edit, setEdit] = useState(false)
    const [addCerti, setAddCerti] = useState(false)
    const profile = useSelector((state: any) => state.profile)

    /**
     * Toggles the edit mode state for existing certifications
     */
    const handleEdit = () => {
        setEdit(!edit)
    }

    return (
        <div className="px-3">
            <div className="text-2xl font-semibold mb-5 flex justify-between">Certifications
                <div className="flex gap-2">
                    <ActionIcon onClick={() => setAddCerti(true)} variant="subtle" color="darkorchid" size={matches ? "lg" : "md"}>
                        <IconPlus className="h-4/5 w-4/5" />
                    </ActionIcon>
                    <ActionIcon onClick={() => handleEdit()} variant="subtle" color={edit ? "red.8" : "darkorchid"} size={matches ? "lg" : "md"}>
                        {
                            edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                        }
                    </ActionIcon>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                {
                    profile?.certifications?.map((cert: any, index: number) => <Certification key={index} index={index} edit={edit} {...cert} />)
                }
                {
                    addCerti && <CertiInput setEdit={setAddCerti} />
                }
            </div>
        </div>
    )
}