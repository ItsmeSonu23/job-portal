import { ActionIcon } from "@mantine/core"
import { IconPlus, IconPencil, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { ExpCard } from "./ExpCard"
import { ExpInput } from "./ExpInput"
import { useSelector } from "react-redux"
import { useMediaQuery } from "@mantine/hooks"
/**
 * Experience Component
 * 
 * A component that manages and displays a user's work experience history in their profile.
 * Allows adding new experiences and editing existing ones.
 * 
 * @component
 * 
 * Features:
 * - Display list of work experiences
 * - Add new experience entries
 * - Toggle edit mode for existing experiences
 * - Redux integration for profile data
 * 
 * Visual Elements:
 * - "Experience" heading with action buttons
 * - Add experience button (plus icon)
 * - Edit toggle button (pencil/X icon)
 * - List of experience entries
 * - Experience input form when adding
 * 
 * Layout:
 * - Horizontal padding (px-3)
 * - Flex layout with space between header items
 * - Vertical stack of experience entries with 8px gap
 * 
 * State Management:
 * - Local edit mode state
 * - Local add experience state
 * - Redux profile state for experience data
 * 
 * Props: None
 * 
 * State:
 * @property {boolean} addExp - Controls visibility of add experience form
 * @property {boolean} edit - Controls edit mode for existing experiences
 * 
 * Redux:
 * @property {Object} profile - User profile data from Redux store
 * 
 * Child Components:
 * - ExpCard: Displays individual experience entries
 * - ExpInput: Form for adding new experiences
 * 
 * @returns {JSX.Element} An experience management interface
 */
export const Expirience = () => {
    const matches = useMediaQuery(`(min-width: 475px)`)
    const profile = useSelector((state: any) => state.profile)
    const [addExp, setAddExp] = useState(false)
    const [edit, setEdit] = useState(false)

    /**
     * Toggles the edit mode state for existing experiences
     */
    const handleEdit = () => {
       setEdit(!edit)
    }

    return (
        <div>
            <div className="px-3 ">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Expirience
                    <div className="flex gap-2">
                        <ActionIcon onClick={() => setAddExp(true)} variant="subtle" color="darkorchid" size={matches ? "lg" : "md"}>
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>
                        <ActionIcon onClick={() => handleEdit()} variant="subtle" color={edit ? "red.8" : "darkorchid"} size={matches ? "lg" : "md"}>
                            {
                                edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                            }
                        </ActionIcon>
                    </div>

                </div>
            </div>
            <div className="flex flex-col gap-8">
                {
                    profile?.expiriences?.map((exp: any, index: number) => <ExpCard index={index} edit={edit} key={index} {...exp} />)
                }
                {
                    addExp && <ExpInput add setEdit={setAddExp} />
                }
            </div>
        </div >
    )
}