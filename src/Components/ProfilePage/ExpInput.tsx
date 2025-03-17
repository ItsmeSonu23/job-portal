import { Button, Checkbox, Textarea } from "@mantine/core"
import { SelectInputt } from "./SelectInputt"
import { useEffect } from "react"
import { MonthPickerInput } from "@mantine/dates"
import { profileFeild } from "../../Data/Data"
import { useDispatch, useSelector } from "react-redux"
import { isNotEmpty, useForm } from "@mantine/form"
import { successNotification } from "../../Services/NotificationService"
import { changeProfile } from "../../Slices/ProfileSlice"

/**
 * ExpInput Component
 * 
 * A form component for adding and editing work experience entries in a user's profile.
 * Provides form validation, date selection, and Redux integration.
 * 
 * @component
 * 
 * Features:
 * - Add new or edit existing experience entries
 * - Form validation for all required fields
 * - Date range selection with validation
 * - "Currently working" toggle
 * - Redux state management
 * - Success notifications
 * 
 * Visual Elements:
 * - Title heading ("Add Experience" or "Edit Experience")
 * - Job title select input
 * - Company select input  
 * - Location select input
 * - Description textarea
 * - Start/end date pickers
 * - Currently working checkbox
 * - Save/Discard buttons
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {boolean} props.add - Whether adding new or editing existing
 * @param {string} props.title - Job title (for edit mode)
 * @param {string} props.company - Company name (for edit mode)
 * @param {string} props.location - Job location (for edit mode)
 * @param {string} props.description - Job description (for edit mode)
 * @param {Date} props.startDate - Start date (for edit mode)
 * @param {Date} props.endDate - End date (for edit mode)
 * @param {boolean} props.working - Currently working status (for edit mode)
 * @param {number} props.index - Index in experiences array (for edit mode)
 * @param {Function} props.setEdit - Function to toggle edit mode
 * 
 * Form Fields:
 * - title: Job title (required)
 * - company: Company name (required)
 * - location: Job location (required)
 * - description: Job description (required)
 * - startDate: Employment start date
 * - endDate: Employment end date
 * - working: Currently working here flag
 * 
 * State Management:
 * - Uses Mantine form hook for form state
 * - Redux for profile state
 * - Validates input on change
 * - Initializes form with existing data in edit mode
 * 
 * Date Validation:
 * - End date must be after start date
 * - Start date must be before current date
 * - End date disabled when "currently working"
 * 
 * Layout:
 * - Flex column container with gaps
 * - Two-column layout for title/company
 * - Full-width location and description
 * - Two-column date pickers
 * - Button group at bottom
 * 
 * @returns {JSX.Element} An experience input form
 */
export const ExpInput = (props: any) => {
    const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.profile)

    useEffect(() => {
        if (!props.add) form.setValues(
            {
                title: props.title,
                company: props.company,
                location: props.location,
                description: props.description,
                startDate: new Date(props.startDate),
                endDate: new Date(props.endDate),
                working: props.working
            }
        )

    }, [])

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: "",
            company: "",
            location: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            working: false
        },

        validate: {
            title: isNotEmpty("Title is required"),
            company: isNotEmpty("Company is required"),
            location: isNotEmpty("Location is required"),
            description: isNotEmpty("Description is required")
        }
    })

    const handleSave = () => {
        form.validate()
        if (!form.isValid()) return;
        let exp = [...profile.expiriences]
        if (props.add) {
            exp.push(form.getValues())
            exp[exp.length - 1].startDate = exp[exp.length - 1].startDate.toISOString();
            exp[exp.length - 1].endDate = exp[exp.length - 1].endDate.toISOString();
        }
        else {
            exp[props.index] = form.getValues()
            exp[props.index].startDate = exp[props.index].startDate.toISOString();
            exp[props.index].endDate = exp[props.index].endDate.toISOString();
        }
        props.setEdit(false)
        let updatedProfile = { ...profile, expiriences: exp }
        dispatch(changeProfile(updatedProfile))
        successNotification("Expiriences updated successfully", `Your profile expirience has been ${props.add?"added":"updated"}`)
    }
    return (
        <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">{props.add ? "Add Expirience" : "Edit Expirience"}</div>
            <div className="">
                <SelectInputt form={form} name="title" {...profileFeild[0]} />
                <SelectInputt form={form} name="company" {...profileFeild[1]} />
            </div>
            <SelectInputt form={form} name="location"  {...profileFeild[2]} />

            <Textarea {...form.getInputProps("description")} withAsterisk label="Summary" autosize minRows={3} placeholder="Enter summary" />

            <div className="flex gap-10 max-mdsm:gap-5 [&>*]:w-1/2 max-xssm:[&>*]:w-full max-xssm:flex-wrap my-3">
                <MonthPickerInput {...form.getInputProps("startDate")} withAsterisk maxDate={form.getValues().endDate || undefined} label="Start Date" placeholder="Pick Date" />

                <MonthPickerInput {...form.getInputProps("endDate")} disabled={form.getValues().working} withAsterisk minDate={form.getValues().startDate || undefined} maxDate={new Date()} label="End Date" placeholder="Pick Date" />
            </div>

            <Checkbox checked={form.getValues().working} onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)} autoContrast label="Currently working here" />

            <div className="flex gap-5 max-xssm:!w-full">
                <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
                <Button onClick={()=> props.setEdit(false)} color="red.5" variant="light">Discard</Button>
            </div>
        </div >
    )
}