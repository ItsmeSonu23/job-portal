import { Avatar, Button, Divider, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { getProfile } from "../../Services/ProfileService"
import { NavLink, useParams } from "react-router-dom"
import { DateInput, TimeInput } from "@mantine/dates"
import { changeAppStatus } from "../../Services/JobService"
import { errorNotification, successNotification } from "../../Services/NotificationService"
import { formatInterviewTime, openBase64PDF } from "../../Services/Utilities"

/**
 * TalentCard Component
 * 
 * A card component that displays talent/candidate information with interactive features.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.applicantId - ID of the applicant to fetch profile data
 * @param {boolean} props.invited - Whether the talent has been invited for interview
 * @param {boolean} props.posted - Whether this is for a posted job
 * 
 * Features:
 * - Displays talent profile information including:
 *   - Profile picture
 *   - Name
 *   - Job title and company
 *   - Skills (up to 4)
 *   - Expected salary
 *   - Location
 * - Interactive elements:
 *   - Favorite button
 *   - View Profile link
 *   - Message/Schedule buttons
 *   - Accept/Reject buttons for invites
 * - Interview scheduling modal with:
 *   - Date picker
 *   - Time picker
 *   - Schedule confirmation button
 * 
 * State Management:
 * - profile: Stores fetched profile data
 * - opened: Controls modal visibility
 * - value: Stores selected interview date
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Purple accents (Electric Violet)
 * - Hover effects with shadow
 * - Responsive layout with flex containers
 * - Consistent spacing and typography
 * 
 * Layout:
 * - Card width: 384px (w-96)
 * - Rounded corners (xl)
 * - Padding: 16px (p-4)
 * - Flex column with 12px gap (gap-3)
 * 
 * Conditional Rendering:
 * - Different button sets based on invite status
 * - Interview time display for invited talents
 * - Salary and location for non-invited talents
 * 
 * API Integration:
 * - Fetches profile data on mount if applicantId provided
 * - Handles API errors gracefully
 * - Supports base64 encoded profile pictures
 * 
 * @returns {JSX.Element} A talent profile card with interactive features
 */
export const TalentCard = (props: any) => {
    const { id } = useParams()
    const ref = useRef<HTMLInputElement>(null)
    const [profile, setProfile] = useState<any>(null)
    const [opened, { open, close }] = useDisclosure(false)
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false)
    const [date, setDate] = useState<Date | null>(null)
    const [time, setTime] = useState<string>("")
    useEffect(() => {
        if (props.applicantId) getProfile(props.applicantId).then((res: any) => {
            setProfile(res)
        }).catch((err: any) => {
            console.log(err)
        })
        else setProfile(props)
    }, [props])

    const handleOffer = (status: string) => {
        let interview: any = { id: id, applicantId: profile?.id, applicationStatus: status }
        if (status == "INTERVIEWING") {
            const [hours, minutes] = time.split(":").map(Number);
            date?.setHours(hours, minutes)
            interview.interviewTime = date
        }
        changeAppStatus(interview).then((res: any) => {
            console.log(res);

            if (status == "INTERVIEWING") successNotification("Interview Scheduled Successfully", "You can now view the interview details in the interview section")
            else if (status == "OFFERED") successNotification("Application Offered Successfully", "You can now view the application details in the application section")
            else if (status == "REJECTED") successNotification("Application Rejected Successfully", "You can now view the application details in the application section")
            window.location.reload()

        }).catch((err: any) => {
            console.log(err)
            if (err.response && err.response.status === 403) {
                errorNotification("CORS Error", "Access to the requested resource is blocked by CORS policy")
            } else {
                errorNotification("Failed to Schedule Interview", "Please try again")
            }
        })
    }

    return <div className="p-4 rounded-xl bg-[var(--color-mine-shaft-900)] hover:shadow-[0_0_5px_1px_darkorchid] !shadow-[var(--color-electric-violet-500)] transition duration-300 ease-in-out w-96 max-bssm:w-[45%] max-mdsm:w-full max-lgsm:w-[45%] flex flex-col gap-3">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-[var(--color-mine-shaft-800)] rounded-full">
                    <Avatar className="rounded-full" size={"lg"} src={profile?.picture ? `data:image/jpg;base64,${profile?.picture}` : `/Avatar.png`} />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-lg font-semibold">{profile?.name}</div>
                    <div className="text-sm text-[var(--color-mine-shaft-300)]">{profile?.jobTitle} &bull; {profile?.company}</div>
                </div>
            </div>
            <IconHeart className="cursor-pointer text-[var(--color-mine-shaft-300)]" />
        </div>
        <div className="flex gap-2  flex-wrap">
            {
                profile?.skills?.length > 0 ? profile.skills.map((skill: any, index: any) => index < 4 && <div key={index} className="p-2 py-1 bg-[var(--color-mine-shaft-800)] rounded-lg text-xs text-[var(--color-electric-violet-500)]">
                    {skill}
                </div>) : <div className="text-xs text-[var(--color-mine-shaft-300)]">No skills available</div>
            }
        </div>
        <Text className="!text-xs text-justify text-[var(--color-mine-shaft-300)]">
            {profile?.about}
        </Text>
        <Divider color="var(--color-mine-shaft-800)" size={"xs"} />
        {
            props.invited ? <div className="flex gap-1 text-sm text-[var(--color-mine-shaft-300)] items-center">
                <IconCalendarMonth stroke={1.5} /> Interview :  {formatInterviewTime(props.interviewTime)}
            </div> :
                <div className="flex justify-between ">
                    <div className="font-semibold text-[var(--color-mine-shaft-300)]">
                        Exp: {props.totalExp?props.totalExp+" years":"Fresher"}
                    </div>
                    <div className="text-xs text-[var(--color-mine-shaft-300)] flex gap-1 items-center">
                        <IconMapPin className="h-5 w-5" /> {profile?.location}
                    </div>
                </div>
        }
        <Divider color="var(--color-mine-shaft-800)" size={"xs"} />
        <div className="flex [&>*]:w-1/2 [&>*]:p-1">
            {
                !props.invited &&
                <>
                    <NavLink to={`/talent-profile/${profile?.id}`}>
                        <Button variant="outline" color="var(--color-electric-violet-500)">View Profile</Button>
                    </NavLink>
                    <div>
                        {
                            props.posted ? <Button variant="light" color="var(--color-electric-violet-500) " onClick={open} rightSection={<IconCalendarMonth className="h-5 w-5" />} fullWidth>Schedule</Button> :
                                <Button variant="outline" color="var(--color-electric-violet-500)">Message</Button>
                        }
                    </div>
                </>
            }
            {
                props.invited &&
                <>
                    <div>
                        <Button variant="light" color="var(--color-electric-violet-500) " onClick={() => handleOffer("OFFERED")} fullWidth>Accept</Button>
                    </div>
                    <div>
                        <Button variant="light" color="var(--color-electric-violet-500) " onClick={() => handleOffer("REJECTED")} fullWidth>Reject</Button>
                    </div>
                </>
            }
        </div>
        {
            (props.invited || props.posted) ? <Button variant="filled" color="var(--color-electric-violet-500) " fullWidth onClick={openApp} autoContrast>View Application</Button> : null
        }
        <Modal opened={opened} onClose={close} title="Schedule Interview" radius={"lg"}>
            <div className="flex flex-col gap-4">
                <DateInput value={date} onChange={setDate} minDate={new Date()} label="Date" placeholder="Select Date" />
                <TimeInput label="Time" value={time} onChange={(event) => setTime(event.currentTarget.value)} ref={ref} minTime="" onClick={() => ref.current?.showPicker()} />
                <Button onClick={() => handleOffer("INTERVIEWING")} variant="light" color="var(--color-electric-violet-500) " fullWidth>Schedule</Button>
            </div>
        </Modal>
        <Modal opened={app} onClose={closeApp} title="Application Details" radius={"lg"}>
            <div className="flex flex-col gap-4">
                <div className="">
                    Email: &emsp; <a className="text-[var(--color-electric-violet-500)] hover:underline cursor-pointer text-center" href={`mailto:${props?.email}`}>{props?.email}</a>
                </div>
                <div className="">
                    Website: &emsp; <a target="_blank" rel="noopener noreferrer" className="text-[var(--color-electric-violet-500)] hover:underline cursor-pointer text-center" href={`${props?.website}`}>{props?.website}</a>
                </div>
                <div className="">
                    Resume: &emsp; <span className="text-[var(--color-electric-violet-500)] hover:underline cursor-pointer text-center" onClick={() => openBase64PDF(props?.resume)}>{props?.name}</span>
                </div>
                <div className="">
                    Cover Letter: &emsp; <div>{props?.coverLetter}</div>
                </div>

            </div>
        </Modal>
    </div>
}