import { Button, TextInput } from "@mantine/core"
import { SelectInputt } from "./SelectInputt"
import { MonthPickerInput } from "@mantine/dates"
import { profileFeild } from "../../Data/Data"
import { useForm, isNotEmpty } from "@mantine/form"
import { useDispatch, useSelector } from "react-redux"
import { successNotification } from "../../Services/NotificationService"
import { changeProfile } from "../../Slices/ProfileSlice"

/**
 * CertiInput Component
 * 
 * A form component for adding new certifications to a user's profile.
 * Provides validation, date selection, and Redux integration.
 * 
 * @component
 * 
 * Features:
 * - Form validation for all fields
 * - Month/year date picker
 * - Custom select input for issuer
 * - Success notifications
 * - Redux state management
 * 
 * Visual Elements:
 * - Title heading
 * - Two-column layout for title and issuer
 * - Date picker with max date limit
 * - Certificate ID input
 * - Save and Discard buttons
 * 
 * Form Fields:
 * - title: Certification title (required)
 * - issuer: Certification issuer (required)
 * - issueDate: Date certification was issued (required)
 * - certificateId: Unique certificate identifier (required)
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {Function} props.setEdit - Function to toggle edit mode
 * 
 * State Management:
 * - Uses Mantine form hook for form state
 * - Redux for profile state
 * - Validates input on change
 * 
 * Actions:
 * - Save certification to profile
 * - Validate form fields
 * - Show success notification
 * - Cancel/discard changes
 * 
 * Layout:
 * - Flex column container
 * - Two-column layout for title/issuer
 * - Full-width date picker
 * - Button group at bottom
 * 
 * @returns {JSX.Element} A certification input form
 */
export const CertiInput = (props: any) => {
    const profile = useSelector((state: any) => state.profile)
    const dispatch = useDispatch();
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: "",
            issuer: "",
            issueDate: new Date(),
            certificateId: ""
        },

        validate: {
            title: isNotEmpty("Title is required"),
            issuer: isNotEmpty("issuer is required"),
            issueDate: isNotEmpty("issue date is required"),
            certificateId: isNotEmpty("Certificate id is required")
        }
    })

    /**
     * Handles saving the new certification
     * Validates form, updates Redux store and shows success notification
     */
    const handleSave = () => {
        form.validate()
        if (!form.isValid()) return;
        let certi = [...profile.certifications]
        certi.push(form.getValues())
        certi[certi.length - 1].issueDate = certi[certi.length - 1].issueDate.toISOString();
        let updatedProfile = { ...profile, certifications: certi }
        props.setEdit(false)
        dispatch(changeProfile(updatedProfile))
        successNotification("Certification updated successfully", "Your profile certification has been added successfully")
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">Add Certificate</div>
            <div className="[&>*]:w-1/2 flex gap-1 max-xssm:[&>*]:w-full max-xssm:flex-wrap my-3">
                <TextInput {...form.getInputProps("title")} label="Title" withAsterisk placeholder="Enter title" />
                <SelectInputt form={form} name="issuer" {...profileFeild[1]} />
            </div>
            <div className="flex gap-10 max-xssm:gap-5 max-xssm:[&>*]:w-full max-xssm:flex-wrap my-3">
                <MonthPickerInput {...form.getInputProps("issueDate")} withAsterisk maxDate={new Date()} label="Issued Date" placeholder="Pick Date" />
                <TextInput {...form.getInputProps("certificateId")} label="Certificate ID" withAsterisk placeholder="Enter certificate id" />
            </div>
            <div className="flex gap-5">
                <Button onClick={handleSave} color="darkorchid" variant="outline">Save</Button>
                <Button onClick={() => props.setEdit(false)} color="red.5" variant="light">Discard</Button>
            </div>
        </div >
    )
}