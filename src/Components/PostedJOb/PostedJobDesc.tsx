import { Badge, Tabs } from "@mantine/core"
import { TalentCard } from "../FindTalent/TalentCard"
import { JobDescription } from "../JobDescription/JobDescription"
import { useState, useEffect } from "react"
/**
 * PostedJobDesc Component
 * 
 * A component that displays detailed information about a posted job, including overview and applicant management.
 * Features tabbed navigation between different applicant statuses and job details.
 * 
 * @component
 * 
 * Features:
 * - Job title and status display
 * - Location information
 * - Tabbed interface for different views
 * - Applicant filtering by status
 * - Job description editor
 * 
 * Visual Elements:
 * - Large job title with status badge
 * - Location text in subdued color
 * - Tab navigation with active state highlighting
 * - Filtered applicant card displays
 * 
 * Layout:
 * - 3/4 width container (w-3/4)
 * - Horizontal padding of 20px (px-5)
 * - Top margin of 20px (mt-5)
 * - Flexible card grid for applicants
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Electric Violet accents for active tabs
 * - Light variant badge for job status
 * - Large tab text with custom active state
 * 
 * Tabs:
 * - Overview: Job description editor
 * - Applicants: Shows applied candidates
 * - Invited: Shows interviewing candidates
 * - Offered: Placeholder for offered candidates
 * - Rejected: Placeholder for rejected candidates
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {string} props.jobTitle - Title of the job posting
 * @param {string} props.jobStatus - Current status of the job
 * @param {string} props.location - Location of the job
 * @param {Array<Object>} props.applicants - Array of applicant data
 * 
 * Data Flow:
 * - Filters applicants based on applicationStatus
 * - Passes job data to JobDescription component
 * - Passes applicant data to TalentCard components
 * 
 * @returns {JSX.Element} A detailed view of job posting and applicant management
 */
export const PostedJobDesc = (props: any) => {
    const [tab, setTab] = useState("overview")
    const [arr, setArr] = useState<any>([])
    const handleTab= (value: any) => {   
        setTab(value)
        if(value=="applicants"){
            setArr(props.applicants?.filter((x: any) => x.applicationStatus === "APPLIED"))
        }else if(value=="invited"){
            setArr(props.applicants?.filter((x: any) => x.applicationStatus === "INTERVIEWING"))
        }else if(value=="offered"){
            setArr(props.applicants?.filter((x: any) => x.applicationStatus === "OFFERED"))
        }else if(value=="rejected"){
            setArr(props.applicants?.filter((x: any) => x.applicationStatus === "REJECTED"))
        }
    }

    useEffect(()=>{
        handleTab("overview")
    },[props])

    return <div className="mt-5 w-3/4 max-mdsm:w-full px-5 max-mdsm:px-0">
        {
            props.jobTitle ? (
                <>
                    <div className="text-2xl max-xssm:text-xl font-semibold flex items-center">
                        {props.jobTitle} <Badge variant="light" ml="sm" size="sm" color="darkorchid">{props.jobStatus}</Badge>
                    </div>
                    {props.location && <div className="font-medium text-[var(--color-mine-shaft-300)] mb-5 max-xssm:text-sm">{props.location}</div>}
                    <div className="">
                        <Tabs variant="outline" radius="lg" value={tab} onChange={handleTab}>
                            <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold [&_button[data-active='true']]:!text-[var(--color-electric-violet-500)] max-smsm:[&_button]:!text-lg max-xssm:[&_button]:!text-base max-xssm:[&_button]:!px-1.5 max-xssm:[&_button]:!font-medium max-xssm:[&_button]:!py-1.5 max-xsmm:[&_button]:!text-sm">
                                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="overview" className="[&>div]:w-full">
                                <JobDescription edit={true}{...props} closed={props.jobStatus == "CLOSED"} />
                            </Tabs.Panel>
                            <Tabs.Panel value="applicants">
                                <div className="mt-10 flex flex-wrap gap-5">
                                    {arr?.length?arr.map((talent: any, index: any) => <TalentCard key={index} {...talent} posted={true} />) : <div className="text-2xl font-semibold text-center">No Applicants</div>}
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel value="invited">
                                <div className="mt-10 mx-5 flex flex-wrap gap-10">
                                    {
                                        arr?.length?arr.map((talent: any, index: any) => <TalentCard key={index} {...talent} invited={true} />) : <div className="text-2xl font-semibold text-center">No Invites</div>
                                    }
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel value="offered">
                                <div className="mt-10 mx-5 flex flex-wrap gap-10">
                                    {
                                        arr?.length?arr.map((talent: any, index: any) => <TalentCard key={index} {...talent} offered={true} />) : <div className="text-2xl font-semibold text-center">No Offers</div>
                                    }
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel value="rejected">
                                <div className="mt-10 mx-5 flex flex-wrap gap-10">
                                    {
                                        arr?.length?arr.map((talent: any, index: any) => <TalentCard key={index} {...talent} rejected={true} />) : <div className="text-2xl font-semibold text-center">No Rejected</div>
                                    }
                                </div>
                            </Tabs.Panel>
                        </Tabs>
                    </div>
                </>
            ) : (
                <div className="text-2xl font-semibold flex items-center justify-center min-h-[70vh]">No Job Selected</div>
            )
        }
    </div>
}