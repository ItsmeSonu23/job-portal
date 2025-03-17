import { Button } from "@mantine/core"
import { useState } from "react"
import { ExpInput } from "./ExpInput"
import { formatDate } from "../../Services/Utilities"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../Slices/ProfileSlice"
import { successNotification } from "../../Services/NotificationService"

/**
 * ExpCard Component
 * 
 * A component that displays a single experience entry in a user's profile with edit and delete functionality.
 * 
 * @component
 * 
 * Features:
 * - Displays work experience details (title, company, location, dates)
 * - Shows company logo/icon
 * - Edit and delete functionality when in edit mode
 * - Toggle between display and edit views
 * - Redux integration for state management
 * 
 * Visual Elements:
 * - Company icon/logo in dark background
 * - Job title in semibold font
 * - Company name and location with bullet separator
 * - Date range (start - end/present)
 * - Job description in justified text
 * - Edit/Delete buttons when in edit mode
 * 
 * Layout:
 * - Flex column container with gap
 * - Two-row layout: header and description
 * - Header: Left side (icon + details) and right side (dates)
 * - Action buttons in bottom row when editing
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {string} props.title - Job title
 * @param {string} props.company - Company name
 * @param {string} props.location - Job location
 * @param {Date} props.startDate - Start date of employment
 * @param {Date} props.endDate - End date of employment
 * @param {boolean} props.working - Whether currently working here
 * @param {string} props.description - Job description
 * @param {number} props.index - Index in experiences array
 * @param {boolean} props.edit - Whether edit mode is active
 * 
 * State:
 * @property {boolean} edit - Controls display/edit mode toggle
 * 
 * Redux:
 * - Uses profile state for experience data
 * - Dispatches profile updates on deletion
 * 
 * @returns {JSX.Element} An experience card or edit form
 */
export const ExpCard = (props: any) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const profile = useSelector((state:any)=> state.profile)

    /**
     * Handles deletion of the experience entry
     * Updates Redux store and shows success notification
     */
    const handleDelete = ()=>{
        let exp = [...profile.expiriences]
        exp.splice(props.index,1)
        let updatedProfile = {...profile, expiriences:exp}
        dispatch(changeProfile(updatedProfile))
        successNotification("Success","Expirience deleted successfully")
    }

    return !edit ? <div className="flex flex-col gap-2">
        <div className="flex justify-between flex-wrap">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-[var(--color-mine-shaft-800)] rounded-md">
                    <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold">{props.title}</div>
                    <div className="text-sm text-[(--color-mine-shaft-300)]">{props.company} &#x2022; {props.location}</div>
                </div>
            </div>
            <div className="text-sm gap-2 text-[var(--color-mine-shaft-300)]">
                {formatDate(props.startDate)} - {props.working?"Present":formatDate(props.endDate)}
            </div>
        </div>
        <div className="text-sm  text-[var(--color-mine-shaft-300)] text-justify">
            {props.description}
        </div>
        {props.edit && <div className="flex gap-5">
            <Button onClick={() => setEdit(true)} color="green.8" variant="light">Edit</Button>
            <Button color="red.8" variant="light" onClick={handleDelete}>Delete</Button>
        </div>}
    </div> : <ExpInput {...props} setEdit={setEdit} />
}