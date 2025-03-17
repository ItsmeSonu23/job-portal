import { ActionIcon, NumberInput, TextInput } from "@mantine/core"
import { IconPencil, IconBriefcase, IconMapPin, IconCheck, IconX } from "@tabler/icons-react"
import { profileFeild } from "../../Data/Data"
import { SelectInputt } from "./SelectInputt"
import { useState } from "react"
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../Slices/ProfileSlice"
import { successNotification } from "../../Services/NotificationService"
import { useMediaQuery } from "@mantine/hooks"

/**
 * Info Component
 * 
 * A component that displays and allows editing of a user's basic profile information.
 * 
 * @component
 * 
 * Features:
 * - Display user's name, job title, company and location
 * - Toggle between view and edit modes
 * - Form validation for editable fields
 * - Redux integration for state management
 * - Success notifications on updates
 * 
 * Visual Elements:
 * - User's name in large font
 * - Edit/Save/Cancel action buttons
 * - Job title and company with briefcase icon
 * - Location with map pin icon
 * - Form inputs in edit mode
 * 
 * Layout:
 * - Flex container with justified content
 * - Two-column layout for job/company fields
 * - Full-width location field
 * - Icon + text combinations
 * 
 * Props: None
 * 
 * State:
 * @property {boolean} edit - Controls display/edit mode toggle
 * 
 * Redux:
 * @property {Object} user - User data from Redux store
 * @property {Object} profile - Profile data from Redux store
 * 
 * Form Fields:
 * - jobTitle: User's current job title
 * - company: Current employer
 * - location: Work location
 * 
 * Actions:
 * - Toggle edit mode
 * - Save profile changes
 * - Cancel edits
 * 
 * Child Components:
 * - SelectInputt: Custom select input for form fields
 * 
 * @returns {JSX.Element} A profile information display/edit interface
 */
export const Info = () => {
    const matches = useMediaQuery(`(min-width: 475px)`)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const user = useSelector((state: any) => state.user)
    const profile = useSelector((state: any) => state.profile)

    /**
     * Toggles edit mode and initializes form with current values
     */
    const handleEdit = () => {
        if (!edit) {
            setEdit(true)
            form.setValues({ name: profile.name, jobTitle: profile.jobTitle, company: profile.company, location: profile.location, totalExp: profile.totalExp })
        } else {
            setEdit(false)
        }
    }

    const form = useForm({
        mode: 'controlled',
        initialValues: { name: '', jobTitle: '', company: '', location: '', totalExp: 0 }
    });

    /**
     * Saves form changes to Redux store and shows success notification
     */
    const handleSave = () => {
        setEdit(false)
        let updatedProfile = { ...profile, ...form.getValues() }
        dispatch(changeProfile(updatedProfile))
        successNotification("Profile updated successfully", "Your profile has been updated")
    }

    return (
        <>
            <div className="text-3xl max-xssm:text-2xl max-xsmm:text-xl font-semibold flex justify-between">
                {edit ? <div>
                    <TextInput withAsterisk label="Name" {...form.getInputProps("name")} name="name" />
                </div> : <>
                    {profile.name}
                </>
                }
                <div>{edit && <ActionIcon onClick={() => handleSave()} variant="subtle" color="green.8" size={matches ? "lg" : "md"}>
                    <IconCheck className="h-4/5 w-4/5" />
                </ActionIcon>}
                    <ActionIcon onClick={() => handleEdit()} variant="subtle" color={edit ? "red.8" : "darkorchid"} size={matches ? "lg" : "md"}>
                        {
                            edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                        }
                    </ActionIcon>
                </div>
            </div>
            {
                edit ? <div>
                    <div className="flex gap-10 max-mdsm:gap-5 [&>*]:w-1/2 max-xssm:[&>*]:w-full max-xssm:flex-wrap my-3">
                        <SelectInputt form={form} name="jobTitle" {...profileFeild[1]} />
                        <SelectInputt form={form} name="company" {...profileFeild[2]} />
                    </div>
                    <div className="flex gap-10 max-mdsm:gap-5 [&>*]:w-1/2 max-xssm:[&>*]:w-full max-xssm:flex-wrap my-3">
                        <SelectInputt form={form} name="location" {...profileFeild[3]} />
                        <NumberInput withAsterisk hideControls min={0} max={50} label="Experience" {...form.getInputProps("totalExp")} name="totalExp" />
                    </div></div> : <div>
                    <div className="text-xl max-xssm:text-base  flex gap-1 items-center"><IconBriefcase className="h-5 w-5" stroke={1.5} />{profile.jobTitle} &bull; {profile.company}</div>
                    <div className="text-lg max-xssm:text-sm flex gap-1 items-center text-[var(--color-mine-shaft-400)]">
                        <IconMapPin className="h-5 w-5" stroke={1.5} />{profile.location}
                    </div>
                    <div className="text-lg max-xssm:text-sm flex gap-1 items-center text-[var(--color-mine-shaft-400)]">
                        <IconBriefcase className="h-5 w-5" stroke={1.5} />Experience: {profile.totalExp} Years
                    </div>
                </div>
            }
        </>
    )
}